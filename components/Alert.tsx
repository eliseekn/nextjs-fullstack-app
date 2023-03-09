export type AlertType = {
    display: boolean,
    status: number, 
    concern: string,
    action: string
}

export default function Alert({display, status, concern, action}: AlertType) {
    const ucFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
    const ed = (str: string): string => str.charAt(-1) === "e" ? str + "d" : str + "ed"

    const setMessage = () => {
        switch (status) {
            case 200: return `${ucFirst(concern)} ${ed(action)} succesfully.`
            case 400: return `Fail to ${action} ${concern.toLowerCase()} - Bad request.` 
            case 403: return `Fail to ${action} ${concern.toLowerCase()} - Forbidden.` 
            case 404: return `Fail to ${action} ${concern.toLowerCase()} - Post not found.` 
            case 500: return `Fail to ${action} ${concern.toLowerCase()} - Internal server error.` 
        }
    }

    if (!display) {return <></>}

    if (status === 200) {
        return <div className="alert alert-success alert-dismissible fade show">
            {setMessage()} <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    }

    return <div className="alert alert-danger alert-dismissible fade show">
        {setMessage()} <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
}
