import fs from 'fs';
import path from 'path';
import {NlpExtension} from "warp-contracts-nlp-plugin";
import {Contract, InteractionResult, LoggerFactory, WarpFactory} from "warp-contracts";
import { JWKInterface } from 'arweave/node/lib/wallet';

LoggerFactory.INST.logLevel('error');

async function getAnswer(input:String) {
  
  try {   
    const contractTxId = fs.readFileSync('./tmp/tmp-nlp-tx-id.txt').toString();
    let jwk: JWKInterface = readJSON('./.secrets/jwk.json');

    const warp = WarpFactory.forMainnet().use(new NlpExtension());
    const contract = warp.contract<any>(contractTxId).connect(jwk);    

    let response: InteractionResult<any, any> = await contract.viewState<any>({
      function: "process",
      lang: 'en',
      text: input
    });

    console.log(response.result.answer);

  } catch (e) {
    console.log(e);
  }

}

(async function main() {
  if (process.argv.length < 3) {
    throw "Please provide input as text";
  }
  const input = process.argv[2];
  await getAnswer(input).catch((e) => console.error(e));
})();

export function readJSON(path: string): JWKInterface {
    const content = fs.readFileSync(path, "utf-8");
    try {
      return JSON.parse(content);
    } catch (e) {
      throw new Error(`File "${path}" does not contain a valid JSON`);
    }
}
  

