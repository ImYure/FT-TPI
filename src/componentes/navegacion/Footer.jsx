
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-marca">
        <span className="escudo"></span>
        <p>
          La forma más simple de organizar tu trabajo
          y tus equipos, todo en un mismo lugar.
        </p>
      </div>

      <div className="footer-columna">
        <h3>Producto</h3>
        <a href="/ParteLegal">Funciones</a>
        <a href="/ParteLegal">Precios</a>
        <a href="/ParteLegal">Novedades</a>
      </div>

      <div className="footer-columna">
        <h3>Empresa</h3>
        <a href="/ParteLegal">Sobre nosotros</a>
        <a href="/ParteLegal">Empleos</a>
        <a href="/ParteLegal">Contacto</a>
      </div>

      <div className="footer-columna">
        <h3>Legal</h3>
        <a href="/ParteLegal">Términos y condiciones</a>
        <a href="/ParteLegal">Política de privacidad</a>
      </div>
    </footer>
  );
}
