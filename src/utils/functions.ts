// utils/getTailwindColor.js
export function getTailwindColor(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

export function downloadCSV(data: BlobPart, filename: string = "download.csv", mimeType: string = "application/vnd.ms-excel"): void {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function downloadFile(data, filename) {
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}