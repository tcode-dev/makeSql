import type { CharacterCode } from "@/const/ConfigConst";

interface Data {
  name: string
  text: string
}

export default class FileExtractor {
  extract(file: File, characterCode: CharacterCode): Promise<Data> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const name = file.name.split(".")[0];
        const text = (event.target?.result as string).replace(/[\n\r][\n\r]?/g, "\n");
        const data = {
          name,
          text,
        };

        resolve(data);
      };

      reader.readAsText(file, characterCode);
    });
  }
}
