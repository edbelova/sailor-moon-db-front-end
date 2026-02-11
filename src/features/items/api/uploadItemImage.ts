import { apiFetch } from '../../../shared/api'

export type UploadItemImageResponse = {
    key: string
    url: string
}

const MAX_IMAGE_FILE_SIZE_BYTES = 5 * 1024 * 1024

type UploadError = {
    status: number
    error: string
    message: string
}

export async function uploadItemImage(file: File): Promise<UploadItemImageResponse> {
    if (file.size > MAX_IMAGE_FILE_SIZE_BYTES) {
        const mb = (MAX_IMAGE_FILE_SIZE_BYTES / (1024 * 1024)).toFixed(0)
        throw {
            status: 413,
            error: 'FILE_TOO_LARGE',
            message: `"${file.name}" exceeds the ${mb} MB upload limit.`,
        } satisfies UploadError
    }

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
