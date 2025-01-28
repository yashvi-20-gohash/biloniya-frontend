// src/components/SingleUpload.tsx
import Link from 'next/link'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import useCommonStore from '@/src/store/common'
import { toast } from 'sonner'
import { Button } from '../../ui/button'
import { X, Upload } from 'lucide-react'
import Image from 'next/image'

interface DocumentDetails {
  fileSize: number
  validFiles: string[]
}

export interface FileData {
  [key: string]: {
    url: string
    filename: string
    alt: string
    type: string
  } | null
}

interface SingleUploadProps {
  name: string
  documentDetails: DocumentDetails | null
  fileData?: FileData // Make fileData optional or nullable
  setFileData: React.Dispatch<React.SetStateAction<FileData>>
  onChange?: (fileInfo: FileData[string]) => void
  onRemove: () => void
  type?: number
}

// Styled component for Avatar Input
export const AvatarInput = styled.div`
  margin-bottom: 0px;
  position: relative;
  align-self: center;
  img {
    width: 44px;
    height: 44px;
    object-fit: cover;
    border-radius: 5px;
  }
  .circle {
    width: 48px;
    height: 48px;
    border-radius: 5px;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #312e38;
    border-radius: 5px;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #f4ede8;
    }
    &:hover {
      background: blue;
    }
  }
  .after-upload {
    width: 125px;
    height: 125px;
  }
`

const SingleUpload: React.FC<SingleUploadProps> = ({
  name,
  documentDetails,
  fileData,
  setFileData,
  onChange,
  onRemove,
  type = 1,
}) => {
  const { isFileLoading, uploadFile, uploadProgress, resetUpload } =
    useCommonStore()
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      if (!documentDetails) {
        toast.error('Please select a document type')
        return
      }
      console.log('acceptedFiles', acceptedFiles)

      const file = acceptedFiles[0]
      if (!file) {
        toast.error('No file selected')
        return
      }

      const { name: fileName, size } = file
      if (Math.round(size / 1024) > documentDetails.fileSize) {
        toast.error(`File cannot be larger than ${documentDetails.fileSize}KB`)
        return
      }

      const nameArray = fileName.split('.')
      const extension = nameArray[nameArray.length - 1].toLowerCase()
      if (!documentDetails.validFiles.includes(extension)) {
        toast.error(
          `Allowed file types are: ${documentDetails.validFiles.join(', ')}`
        )
        return
      }
      const response = await uploadFile(file, type)

      if (response?.data && response?.data?.responses?.length) {
        const file = response?.data?.responses
        const fileInfo = {
          url: file[0].imageUrl,
          filename: file[0].Key,
          alt: fileName,
          type: extension,
        }

        setFileData((prev) => ({
          ...prev,
          [name]: fileInfo,
        }))

        if (onChange) onChange(fileInfo)
      }
    } catch (error) {
      console.error('File upload error:', error)
      toast.error('An error occurred while uploading the file')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: false,
    // maxSize: documentDetails ? documentDetails.fileSize * 1024 : undefined,
  })

  const removeFile = () => {
    onRemove()
    setFileData((prev) => ({
      ...prev,
      [name]: null,
    }))
    resetUpload()
  }
  console.log('fileData', fileData)

  return (
    <div>
      {fileData && fileData[name] ? ( // Check if fileData exists before rendering
        <div
          style={{
            position: 'relative',
            padding: '4px 8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(128, 128, 128, 0.08)',
            border: 'dashed 1px rgba(128, 128, 128, 0.16)',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '460px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            width: '100%',
          }}
        >
          <Link href={fileData[name]?.url ?? ''} target="_blank">
            <AvatarInput>
              {fileData[name]?.type === 'pdf' && (
                <Image
                  width={100}
                  height={100}
                  src="/pdf-icon.png"
                  alt={fileData[name]?.alt ?? ''}
                />
              )}
              {['png', 'jpg', 'jpeg'].includes(fileData[name]?.type ?? '') && (
                <Image
                  width={100}
                  height={100}
                  src={fileData[name]?.url ?? ''} // This line is causing issues
                  alt={fileData[name]?.alt ?? ''} // This line is also potentially an issue
                />
              )}
            </AvatarInput>
          </Link>

          <span
            style={{
              marginLeft: '8px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: '350px',
              display: 'inline-block',
            }}
          >
            {fileData[name]?.alt}
          </span>

          <Button
            onClick={removeFile}
            style={{
              width: '20px',
              height: '20px',
              padding: 0,
              position: 'absolute',
              top: '-8px',
              right: '-6px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: '#fff',
            }}
          >
            <X size={18} />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          style={{
            width: '100%',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: isDragActive
              ? '#e0e0e0'
              : 'rgba(128, 128, 128, 0.08)',
            border: 'dashed 1px rgba(128, 128, 128, 0.16)',
            borderRadius: '6px',
          }}
        >
          <input {...getInputProps()} />
          <Upload size={28} />
          {isDragActive ? (
            <span style={{ marginLeft: '8px' }}>Drop the file here...</span>
          ) : (
            <span style={{ marginLeft: '8px', fontSize: '13px' }}>
              Click or Drag to Upload
            </span>
          )}
        </div>
      )}
      {isFileLoading && (
        <div style={{ width: '100%', marginTop: '8px' }}>
          <p>Uploading: {uploadProgress}%</p>
          <div
            style={{
              width: '100%',
              height: '4px',
              background: '#e0e0e0',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                height: '100%',
                background: 'blue',
                transition: 'width 0.2s',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleUpload
