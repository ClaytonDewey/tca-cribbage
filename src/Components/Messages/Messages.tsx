export const Message = (message: {type: string, msg: string, toggle?: boolean }) => {
    return (
        <div className={message.type}>
            <p>{message.msg}</p>
            { message.toggle && (<i className="close fa fa-times"></i>) }
        </div>
    )
}