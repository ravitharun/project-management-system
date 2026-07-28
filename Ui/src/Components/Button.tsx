type buttonProps = {
  type: "button" | "reset" | "submit",
  Btnname?: string | any,
  classaName: string,
  OnclickEvent?: () => any,
  Icon?: any,
  title?: string,
  disabled?: Boolean | undefined | any
}

function Button({ type, Btnname, classaName, OnclickEvent, Icon, title, disabled }: buttonProps) {
  return (
    <>
      <button disabled={disabled} type={type} onClick={OnclickEvent} className={classaName} title={title}>{Btnname} {Icon ? Icon : ""}</button>

    </>
  )
}

export default Button