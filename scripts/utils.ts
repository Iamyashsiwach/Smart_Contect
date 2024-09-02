import { promises as fs } from 'fs';


export async function getCompiledCode(filename: string) {
  try {
    const sierraFilePath =
      '/Users/jayanthkoppala/Desktop/Developer/counter-workshop/workshop/target/dev/workshop_Counter.contract_class.json';

    // paste it here/Users/jayanthkoppala/Desktop/Developer/counter-workshop/workshop/target/dev/workshop_Counter.compiled_contract_class.jso
    console.log(sierraFilePath);

    const casmFilePath =
      '/Users/jayanthkoppala/Desktop/Developer/counter-workshop/workshop/target/dev/workshop_Counter.compiled_contract_class.json';

    //try it now
    console.log(casmFilePath);
    const code = [sierraFilePath, casmFilePath].map(async (filePath) => {
      try {
        const file = await fs.readFile(filePath);
        console.log(`Read file at ${filePath} Compiling...`);
        return JSON.parse(file.toString('ascii'));
      } catch (error) {
        console.error(`Error reading or parsing file at ${filePath}:`, error);
        throw error; // Rethrow the error to be caught by the outer try-catch
      }
    });

    const [sierraCode, casmCode] = await Promise.all(code);
    // console.log(sierraCode, casmCode);
    return {
      sierraCode,
      casmCode,
    };
  } catch (error) {
    console.error('Failed to get compiled code:', error);
    throw new Error('Could not retrieve the compiled code.'); // You can throw a custom error message
  }
}
