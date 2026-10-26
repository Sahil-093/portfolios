/**
 * GOOGLE APPS SCRIPT: AUTO-TRIGGER GITHUB ACTIONS ON SHEET EDIT
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Paste this code
 * 4. Replace GITHUB_USERNAME, REPO_NAME, and GITHUB_PAT with your values
 * 5. Add an "On edit" or "On change" trigger under Triggers (clock icon)
 */

function onSheetEditTrigger(e) {
  var GITHUB_USERNAME = "your-github-username";
  var REPO_NAME = "your-repo-name";
  var GITHUB_PAT = "ghp_yourPersonalAccessTokenHere"; // Needs "repo" or "workflow" scope

  var url = "https://api.github.com/repos/" + GITHUB_USERNAME + "/" + REPO_NAME + "/dispatches";

  var payload = {
    event_type: "sheet_updated",
    client_payload: {
      timestamp: new Date().toISOString()
    }
  };

  var options = {
    method: "post",
    headers: {
      "Authorization": "token " + GITHUB_PAT,
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Google-Apps-Script"
    },
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log("GitHub Dispatch Triggered: " + response.getResponseCode());
  } catch (err) {
    Logger.log("Error dispatching to GitHub: " + err.toString());
  }
}
