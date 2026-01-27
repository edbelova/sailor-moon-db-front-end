import { apiFetch } from '../../../shared/api'

export type UploadItemImageResponse = {
    key: string
    url: string
}

export async function uploadItemImage(file: File): Promise<UploadItemImageResponse> {
    const formData = new FormData()
    formData.append('file', file)

    return apiFetch<UploadItemImageResponse>(`/api/images`, {
        method: 'POST',
        body: formData,
    })
}

export async function uploadItemImages(files: File[]): Promise<UploadItemImageResponse[]> {
    const uploads = files.map(uploadItemImage)
    return Promise.all(uploads)
}
