export const Message = (message: {type: string, msg: string}) => {
    return (
        <div className={message.type}>
            <p>{message.msg}</p>
        </div>
    )
}