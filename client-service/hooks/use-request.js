import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

export default function useRequest({ url, method, body, onSuccess }) {
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        try {
            setErrors(null)
            const response = await axios.request({
                method,
                url,
                data: body,
            })
            console.log(JSON.stringify(response))
            if (onSuccess) onSuccess(response.data)

            return response.data;
        } catch (e) {
            setErrors(
                <div className={"alert alert-danger"}>
                    <ul className={"list-group my-0"}>
                        {e?.response?.data?.errors?.map((err) => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    return { doRequest, errors }
}
