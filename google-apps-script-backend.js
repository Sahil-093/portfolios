/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: UNIVERSAL CAREER PROFILE & RESUME BACKEND
 * =========================================================================
 * 
 * Functions:
 * 1. Receives form submissions from /join.html
 * 2. Saves uploaded images (Avatar, Project Cover) and RESUME (PDF) directly to Google Drive
 * 3. Sets public view access on all uploaded assets
 * 4. Appends a new row to Google Sheet with career details (Department, Job Type, Experience, Salary, Resume Link)
 * 5. Triggers GitHub Actions to rebuild and deploy the new career profile
 */

var DRIVE_FOLDER_NAME = "Anti-Gravity Career Uploads";
var GITHUB_REPO = "Sahil-093/portfolios";
var GITHUB_PAT = ""; // Optional: Personal Access Token for instant trigger

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    ensureSheetHeaders(sheet);

    var folder = getOrCreateFolder(DRIVE_FOLDER_NAME);
    
    // 1. Save Avatar Image to Drive
    var avatarUrl = "";
    if (data.avatarBase64 && data.avatarFileName) {
      avatarUrl = saveBase64FileToDrive(folder, data.avatarBase64, data.avatarFileName, data.username + "-avatar");
    }

    // 2. Save Official Resume PDF to Drive
    var resumeUrl = "";
    if (data.resumeBase64 && data.resumeFileName) {
      resumeUrl = saveBase64FileToDrive(folder, data.resumeBase64, data.resumeFileName, data.username + "-resume");
    }

    // 3. Save Project Image to Drive
    var projectImgUrl = "";
    if (data.projectImageBase64 && data.projectImageFileName) {
      projectImgUrl = saveBase64FileToDrive(folder, data.projectImageBase64, data.projectImageFileName, data.username + "-project");
    }

    // 4. Append row to Google Sheet
    var newRow = [
      data.name || "",
      data.username || "",
      data.title || "",
      data.department || "Engineering & Tech",
      data.jobType || "Full-Time (Remote)",
      data.experience || "5+ Years",
      data.salary || "Competitive",
      data.location || "",
      data.company || "",
      data.education || "",
      data.bio || "",
      avatarUrl || data.avatarUrl || "",
      resumeUrl || data.resumeUrl || "",
      data.skills || "",
      data.status || "Actively Interviewing",
      data.linkedin || "",
      data.github || "",
      data.twitter || "",
      data.portfolio || "",
      data.projectTitle || "",
      data.projectDesc || "",
      data.projectTags || "",
      data.projectLink || "",
      projectImgUrl || data.projectImageUrl || ""
    ];

    sheet.appendRow(newRow);

    // 5. Trigger GitHub Actions Rebuild
    if (GITHUB_PAT && GITHUB_REPO) {
      triggerGitHubDispatch(GITHUB_REPO, GITHUB_PAT);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Career Profile & Resume uploaded successfully!",
      username: data.username,
      resumeUrl: resumeUrl,
      avatarUrl: avatarUrl
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
    service: "Anti-Gravity Universal Career Engine"
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

function saveBase64FileToDrive(folder, base64Data, originalFileName, customPrefix) {
  var parts = base64Data.split(",");
  var contentType = parts[0].split(";")[0].replace("data:", "");
  var decoded = Utilities.base64Decode(parts[1]);
  var ext = originalFileName.split(".").pop();
  var fileName = customPrefix + "-" + Date.now() + "." + ext;

  var blob = Utilities.newBlob(decoded, contentType, fileName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  if (contentType.indexOf("image") !== -1) {
    return "https://lh3.googleusercontent.com/d/" + file.getId();
  }
  // For PDF / Documents
  return "https://drive.google.com/file/d/" + file.getId() + "/view?usp=sharing";
}

function ensureSheetHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Name", "Username", "Title", "Department", "Job Type", "Experience", 
      "Salary", "Location", "Company", "Education", "Bio", "Avatar", 
      "Resume PDF", "Skills", "Status", "LinkedIn", "GitHub", "Twitter", 
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
