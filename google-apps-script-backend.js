/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: COMPLETE AUTOMATED ONBOARDING BACKEND
 * =========================================================================
 * 
 * Functions:
 * 1. Receives form submissions from /join.html
 * 2. Saves uploaded images (Avatar & Project Cover) directly into a Google Drive folder
 * 3. Makes the uploaded images public so they load instantly on the web
 * 4. Appends a new row to your Google Sheet with all freelancer details
 * 5. Automatically triggers GitHub Actions to rebuild & deploy the new portfolio
 * 
 * DEPLOYMENT INSTRUCTIONS (Takes 60 seconds):
 * 1. Open Google Sheets (create a new blank sheet if you haven't yet)
 * 2. In top menu click: Extensions > Apps Script
 * 3. Delete existing code and paste this entire file
 * 4. Fill in GITHUB_REPO ("Sahil-093/portfolios") and GITHUB_PAT (optional for instant auto-build)
 * 5. Click "Deploy" > "New deployment"
 *    - Type: Web app
 *    - Description: AntiGravity Onboarding
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial!)
 * 6. Click "Deploy", copy the "Web app URL" (ends in /exec)
 * 7. Paste that Web app URL in your /join.html form or send it to me!
 */

var DRIVE_FOLDER_NAME = "Anti-Gravity Portfolio Uploads";
var GITHUB_REPO = "Sahil-093/portfolios"; // e.g., "Sahil-093/portfolios"
var GITHUB_PAT = ""; // Optional: GitHub Personal Access Token for instant triggers

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Ensure headers exist in Row 1 if sheet is blank
    ensureSheetHeaders(sheet);

    // 1. Save Avatar & Project Images to Google Drive
    var folder = getOrCreateFolder(DRIVE_FOLDER_NAME);
    
    var avatarUrl = "";
    if (data.avatarBase64 && data.avatarFileName) {
      avatarUrl = saveBase64ImageToDrive(folder, data.avatarBase64, data.avatarFileName, data.username + "-avatar");
    }

    var projectImgUrl = "";
    if (data.projectImageBase64 && data.projectImageFileName) {
      projectImgUrl = saveBase64ImageToDrive(folder, data.projectImageBase64, data.projectImageFileName, data.username + "-project");
    }

    // 2. Append row to Google Sheet
    var newRow = [
      data.name || "",
      data.username || "",
      data.title || "",
      data.bio || "",
      avatarUrl || data.avatarUrl || "",
      data.skills || "",
      data.hourlyRate || "",
      data.location || "",
      data.status || "Available for Projects",
      data.github || "",
      data.linkedin || "",
      data.twitter || "",
      data.portfolio || "",
      data.projectTitle || "",
      data.projectDesc || "",
      data.projectTags || "",
      data.projectLink || "",
      projectImgUrl || data.projectImageUrl || ""
    ];

    sheet.appendRow(newRow);

    // 3. Trigger GitHub Actions Rebuild (if token is provided)
    if (GITHUB_PAT && GITHUB_REPO) {
      triggerGitHubDispatch(GITHUB_REPO, GITHUB_PAT);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Portfolio submitted successfully! Build initiated.",
      username: data.username,
      avatarUrl: avatarUrl,
      projectImgUrl: projectImgUrl
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Anti-Gravity Onboarding API Engine"
  })).setMimeType(ContentService.MimeType.JSON);
}

// Helpers
function getOrCreateFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  var newFolder = DriveApp.createFolder(folderName);
  newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return newFolder;
}

function saveBase64ImageToDrive(folder, base64Data, originalFileName, customPrefix) {
  var parts = base64Data.split(",");
  var contentType = parts[0].split(";")[0].replace("data:", "");
  var decoded = Utilities.base64Decode(parts[1]);
  var ext = originalFileName.split(".").pop();
  var fileName = customPrefix + "-" + Date.now() + "." + ext;

  var blob = Utilities.newBlob(decoded, contentType, fileName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  // Return direct high-speed CDN view link
  return "https://lh3.googleusercontent.com/d/" + file.getId();
}

function ensureSheetHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Name", "Username", "Title", "Bio", "Avatar", "Skills", 
      "Rate", "Location", "Status", "GitHub", "LinkedIn", "Twitter", 
      "Portfolio", "Project 1 Title", "Project 1 Desc", "Project 1 Tags", 
      "Project 1 Link", "Project 1 Image"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
  }
}

function triggerGitHubDispatch(repo, pat) {
  try {
    var url = "https://api.github.com/repos/" + repo + "/dispatches";
    var payload = { event_type: "sheet_updated" };
    UrlFetchApp.fetch(url, {
      method: "post",
      headers: {
        "Authorization": "token " + pat,
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Google-Apps-Script"
      },
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
  } catch (err) {
    Logger.log("Failed to trigger GitHub: " + err);
  }
}
