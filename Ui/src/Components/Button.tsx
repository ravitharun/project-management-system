type buttonProps = {
  type: "button" | "reset" | "submit",
  Btnname?: string | any,
  classaName: string,
  OnclickEvent?: () => any,
  Icon?: any,
  title?: string
}

function Button({ type, Btnname, classaName, OnclickEvent, Icon, title }: buttonProps) {
  return (
    <>
      <button type={type} onClick={OnclickEvent} className={classaName} title={title}>{Btnname} {Icon ? Icon : ""}</button>

    </>
  )
}

export default Button