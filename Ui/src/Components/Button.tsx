type buttonProps = { type: "button" | "reset" | "submit" , Btnname: string | any, classaName: string, OnclickEvent?: () => void }

function Button({ type, Btnname, classaName, OnclickEvent }: buttonProps) {
  return (
    <>
      <button type={type} onClick={OnclickEvent} className={classaName}>{Btnname}</button>

    </>
  )
}

export default Button