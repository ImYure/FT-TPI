
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
        <a href="/">Funciones</a>
        <a href="/">Precios</a>
        <a href="/">Novedades</a>
      </div>

      <div className="footer-columna">
        <h3>Empresa</h3>
        <a href="/">Sobre nosotros</a>
        <a href="/">Empleos</a>
        <a href="/">Contacto</a>
      </div>

      <div className="footer-columna">
        <h3>Legal</h3>
        <a href="/">Términos y condiciones</a>
        <a href="/">Política de privacidad</a>
      </div>
    </footer>
  );
}
