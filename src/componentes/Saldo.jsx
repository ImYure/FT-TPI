
export default function Saldo({ saldo = 0 }) {

  return (
    <aside className="saldo">

      <div className="saldo-icono">
        <img src="/saldo.png" alt="Saldo" />
      </div>

      <div className="saldo-texto">
        <span className="monto">
          {Number(saldo).toLocaleString("es-AR")}
        </span>
      </div>

    </aside>
  );
}
