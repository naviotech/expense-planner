export type Alert = {
  message: string,
  error: boolean
}
type AlertaProps = {
  alerta : Alert
}
export function Alerta({alerta} : AlertaProps ) {
  return (
    
    <div className={`${alerta.error ? "bg-red-500" : "bg-green-500" } p-3 text-center font-bold text-white rounded-xl mb-6`} >
      {alerta.message}
    </div>
  )
}