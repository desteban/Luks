import estilos from "./EstilosDivider.module.css";

interface props {
  resumen?: string;
  titulo?: string;
}

export function Divider({ resumen, titulo }: props) {
  return (
    <div className={estilos.contenedor}>
      <div className={estilos.espacio}>
        <h4 className={estilos.titulo}>{titulo}</h4>
        {resumen ? <p className={estilos.resumen}>{resumen}</p> : null}
      </div>
      <hr />
    </div>
  );
}
