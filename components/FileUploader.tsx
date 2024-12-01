import { storage } from "@/lib/appwrite.config";
import { imagebuffer } from "@/lib/Atoms";
import { Cloud, UploadCloud } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilValue } from "recoil";

interface droptypes {
  files: File[];
  onChange: (files: File[]) => void;
 imageUrl?:any
}

function FileUploader({ files, onChange, imageUrl}: droptypes) {
  const onDrop = useCallback((acceptedfile: File[]) => {
    onChange(acceptedfile);
  }, []);

  let image = imageUrl
  // if(imageUrl){
  //   image = URL.createObjectURL(imageUrl)
  // }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {image || files?.length > 0 ? (
        <Image
          src={files?.length >0 ? URL.createObjectURL(files[0]) : image!}
          alt=" dropzone file "
          width={1000}
          height={1000}
          className=" max-h-[450px] object-cover object-center overflow-hidden "
        />
      ) : (
        <>
          <UploadCloud className=" text-zinc-500 size-10 " />
          <p className=" text-[14px]  ">
            {" "}
            <span className=" text-emerald-400  mr-1 ">
              {" "}
              select n drop{" "}
            </span>{" "}
            here that you want to upload
          </p>
          <p>only : jpg, png, svg or gif </p>
        </>
      )}
    </div>
  );
}

export default FileUploader;
