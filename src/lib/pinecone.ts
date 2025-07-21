import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './db/s3-server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { stringList } from 'aws-sdk/clients/datapipeline';
import {Document,RecursiveCharacterTextSplitter} from '@pinecone-database/doc-splitter'
import { text } from 'stream/consumers';


let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
};

type PDFPage={
  pageContent: string,
  metadata:{
    loc: {pageNumber:number}
  }
} 

export async function loadS3IntoPinecone(fileKey:string) {
   // 1. here we have fetched the pdf from s3 store and split it into parts using langchain -> split page wise...
    console.log("downloading from s3 to local sys");
    const file_name = await downloadFromS3(fileKey);
    
    if(!file_name){
      throw new Error ("did not download from s3");
    }
    const loader = new PDFLoader(file_name);

    const pages = (await loader.load()) as PDFPage[];
    
    // 2. now we can split it via pinecone into smaller sentences to make the vector embeddings from them.
    const docs = await Promise.all(pages.map(page=>prepareDocument(page)))

    //3. now we can vectorise these spiltted parts



}

export async function embedDocuments{

}

export const truncateStringBytes = (str: String,bytes:number)=>{
  const enc = new TextEncoder();
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0,bytes))
}

async function prepareDocument(page:PDFPage) {
  let {pageContent,metadata} = page;
  pageContent = pageContent.replace(/\n/g,'');

  //split the pdf doc
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata:{
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringBytes(pageContent,36000),
      }
    })
  ])

  return docs;

}
