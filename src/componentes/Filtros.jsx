export default function Filtros() {
  return (<aside className="panel-filtros">
    <div className="filtros-header">
      <div className="filtros-titulo">
        <h2>Filtros</h2>
      </div>
      <p className="filtros-subtitulo">
        Filtra Filtra Filtra Filtra Filtra Filtra Filtra Filtra Filtra
      </p>
    </div>

    <div className="filtros-grupo">
      <h3 className="filtros-label-seccion">Categorías</h3>
      <div className="select-personalizado">
        <select defaultValue="">
          <option value="" disabled>Categorías</option>
          <option value="todos">Todos</option>
          <option value="criatura">Criatura</option>
          <option value="hechizo">Hechizo</option>
        </select>
        <span className="flecha-select">▾</span>
      </div>
    </div>
    <div className="filtros-divisor"></div>
    <div className="filtros-grupo">
      <h3 className="filtros-label-seccion">Rareza</h3>
      <label className="checkbox-label">
        <input type="checkbox" defaultChecked />
        <span className="checkbox-custom"></span>
        Comun
      </label>
      <label className="checkbox-label">
        <input type="checkbox" />
        <span className="checkbox-custom"></span>
        Raro
      </label>
      <label className="checkbox-label">
        <input type="checkbox" />
        <span className="checkbox-custom"></span>
        Legendario
      </label>
    </div>

    <div className="filtros-divisor"></div>

    <div className="filtros-grupo">
      <h3 className="filtros-label-seccion">Ordenar por</h3>
      <div className="select-personalizado">
        <select defaultValue="">
          <option value="" disabled>ns inventen</option>
          <option value="reciente">Más reciente</option>
          <option value="precio">Precio</option>
        </select>
        <span className="flecha-select">▾</span>
      </div>
    </div>
  </aside>
  );
}
