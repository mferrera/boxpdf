const req = "https://dl.boxcloud.com/api/2.0/internal_files/*/pdf/content/*"

function worked() {
    browser.tabs.executeScript({code: `
        document.getElementsByClassName("shared-file-hideable-actions")[0]
        .firstChild.style.border = "1px solid #15aa61";undefined;
    `
    })
}

function didnt(error) {
    console.log(`Failed to fix the PDF button: ${error}`)
}

function inject(request) {
    const code = `
        document.getElementsByClassName("shared-file-hideable-actions")[0]
        .firstChild.onclick = () => window.location = "${request.url}";undefined;
    `
    browser.tabs.executeScript({code}).then(worked, didnt)
}

browser.webRequest.onBeforeRequest.addListener(
    inject,
    {urls: [req], types: ["xmlhttprequest"]},
)
