/**
 * FileExtractor
 */
export default class FileExtractor {
  /**
   * extract
   * @return {object}
   */
  extract(file, characterCode) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const filename = file.name;
        const tableName = filename.split(".")[0];
        const text = event.target.result.replace(/[\n\r][\n\r]?/g, "\n");
        const data = {
          tableName,
          text,
        };

        resolve(data);
      };
  
      reader.readAsText(file, characterCode);
    });
  }
}
