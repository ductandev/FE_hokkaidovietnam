"use client";

import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
    AudioWaveform,
    File,
    FileImage,
    FolderArchive,
    UploadCloud,
    Video,
    X,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";


interface FileUploadProgress {
    progress: number;
    File: File;
    source: CancelTokenSource | null;
}

enum FileTypes {
    Image = "image",
    Pdf = "pdf",
    Audio = "audio",
    Video = "video",
    Other = "other",
}

const ImageColor = {
    bgColor: "bg-purple-600",
    fillColor: "fill-purple-600",
};

const PdfColor = {
    bgColor: "bg-blue-400",
    fillColor: "fill-blue-400",
};

const AudioColor = {
    bgColor: "bg-yellow-400",
    fillColor: "fill-yellow-400",
};

const VideoColor = {
    bgColor: "bg-green-400",
    fillColor: "fill-green-400",
};

const OtherColor = {
    bgColor: "bg-gray-400",
    fillColor: "fill-gray-400",
};

export default function ImageUpload(props: any) {
    const { watch, name, setValue } = props;
    const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
    const [isLoadingUpload, setIsLoadingUpload] = useState(false);
    const watchImagesUploaded = watch(name);

    const getFileIconAndColor = (file: File) => {
        if (file.type.includes(FileTypes.Image)) {
            return {
                icon: <FileImage size={40} className={ImageColor.fillColor} />,
                color: ImageColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Pdf)) {
            return {
                icon: <File size={40} className={PdfColor.fillColor} />,
                color: PdfColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Audio)) {
            return {
                icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
                color: AudioColor.bgColor,
            };
        }

        if (file.type.includes(FileTypes.Video)) {
            return {
                icon: <Video size={40} className={VideoColor.fillColor} />,
                color: VideoColor.bgColor,
            };
        }

        return {
            icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
            color: OtherColor.bgColor,
        };
    };

    // feel free to mode all these functions to separate utils
    // here is just for simplicity
    const onUploadProgress = (
        progressEvent: AxiosProgressEvent,
        file: File,
        cancelSource: CancelTokenSource
    ) => {
        const progress = Math.round(
            (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
        );

        if (progress === 100) {
            // ! When process done remove files from file upload
            setFilesToUpload((prevUploadProgress) => {
                return prevUploadProgress.filter((item) => item.File !== file);
            });

            return;
        }

        setFilesToUpload((prevUploadProgress) => {
            return prevUploadProgress.map((item) => {
                if (item.File.name === file.name) {
                    return {
                        ...item,
                        progress,
                        source: cancelSource,
                    };
                } else {
                    return item;
                }
            });
        });
    };

    const uploadImageToCloudinary = async (
        formData: FormData,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
        cancelSource: CancelTokenSource
    ) => {
        return axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_PUBLIC_CLOUD_NAME}/image/upload`,
            formData,
            {
                onUploadProgress,
                cancelToken: cancelSource.token,
            }
        );
    };

    const removeFile = (file: File, id: number) => {
        setFilesToUpload((prevUploadProgress) => {
            return prevUploadProgress.filter((item) => item.File !== file);
        });
    };

    const removeUrl = (position: number) => {
        let prevUploadedFiles = [...watchImagesUploaded];

        prevUploadedFiles.splice(position, 1);

        setValue(name, prevUploadedFiles)
    }

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsLoadingUpload(true);

        setFilesToUpload((prevUploadProgress) => {
            return [
                ...prevUploadProgress,
                ...acceptedFiles.map((file) => {
                    return {
                        progress: 0,
                        File: file,
                        source: null,
                    };
                }),
            ];
        });

        // cloudinary upload

        const fileUploadBatch = acceptedFiles.map((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append(
                "upload_preset",
                process.env.REACT_APP_PUBLIC_UPLOAD_PRESET as string
            );

            const cancelSource = axios.CancelToken.source();

            return uploadImageToCloudinary(
                formData,
                (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
                cancelSource
            );
        });

        try {
            const getAllPromiseRespone = await Promise.all(fileUploadBatch);

            let url = await getAllPromiseRespone.map((y: any) => y.data.url);

            setIsLoadingUpload(false);

            const newList = [...watchImagesUploaded, ...url];

            setValue(name, newList)
        } catch (error) {
            console.error("Error uploading files: ", error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div>
                <label
                    {...getRootProps()}
                    className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >
                    <div className=" text-center">
                        <div className=" border p-2 rounded-md max-w-min mx-auto">
                            <UploadCloud size={20} />
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Upload files</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Click upload file &#40;File nên dưới 10 MB &#41;
                        </p>
                    </div>
                </label>

                <Input
                    {...getInputProps()}
                    id="dropzone-file"
                    accept="image/png, image/jpeg"
                    type="file"
                    className="hidden"
                />
            </div>

            {filesToUpload.length > 0 && (
                <div>
                    <ScrollArea className="h-40">
                        <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
                            Files đang tải
                        </p>

                        <div className="space-y-2 pr-3">
                            {filesToUpload.map((fileUploadProgress, id) => {
                                return (
                                    <div
                                        key={fileUploadProgress.File.lastModified}
                                        className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                                    >
                                        <div className="flex items-center flex-1 p-2">
                                            <div className="text-white">
                                                {getFileIconAndColor(fileUploadProgress.File).icon}
                                            </div>

                                            <div className="w-full ml-2 space-y-1">
                                                <div className="text-sm flex justify-between">
                                                    <p className="text-muted-foreground ">
                                                        {fileUploadProgress.File.name.slice(0, 25)}
                                                    </p>
                                                    <span className="text-xs">
                                                        {fileUploadProgress.progress}%
                                                    </span>
                                                </div>

                                                {/* <Progress
                                                    progress={fileUploadProgress.progress}
                                                    className={
                                                        getFileIconAndColor(fileUploadProgress.File).color
                                                    }
                                                /> */}

                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (fileUploadProgress.source)
                                                    fileUploadProgress.source.cancel("Upload cancelled");
                                                removeFile(fileUploadProgress.File, id);
                                            }}
                                            className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>
            )}


            {isLoadingUpload ? <p>Đang tải</p> : <>
                {watchImagesUploaded.length > 0 && (
                    <div>
                        <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
                            Files đã upload
                        </p>
                        <div className="space-y-2 pr-3">
                            {watchImagesUploaded.map((url: any, idx: any) => {
                                return (
                                    <div
                                        key={idx}
                                        className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
                                    >
                                        <div className="flex items-center flex-1 p-2">
                                            <img src={url} alt={url} style={{
                                                maxWidth: "70px",
                                                height: "70px"
                                            }} />
                                        </div>

                                        <button
                                            onClick={() => removeUrl(idx)}
                                            className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                                            type="button"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </>}
        </div>
    );
}