import React from 'react'
import { Image, Col } from 'react-bootstrap'

interface IUploadPreviewProps {
    files: File[]
}

function UploadPreview(props: IUploadPreviewProps) {
    const [previewFiles, setPreviewFiles] = React.useState([]);
    (() => {
        if (previewFiles.length === props.files.length) return
        let results = []
        props.files.forEach(_ => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(_)
            fileReader.onload = () => {
                results.push(fileReader.result)
                if (results.length === props.files.length) {
                    setPreviewFiles(results)
                }
            }
        })        
    })()

    return <div className="d-flex justify-content-center">
        {previewFiles.map(data => <div className="thumbnail-container"><Image src={data} thumbnail /></div>)}
    </div>
}

export default UploadPreview