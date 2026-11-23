
export default function Filtros({ filtros, onChange, categorias, rarezas }) {

  function cambiarFiltro(propiedad, valor) {
    onChange({
      ...filtros,
      [propiedad]: valor
    });
  }

  function cambiarRareza(rareza) {
    const nuevasRarezas = filtros.rareza.includes(rareza)
      ? filtros.rareza.filter(r => r !== rareza)
      : [...filtros.rareza, rareza];

    cambiarFiltro("rareza", nuevasRarezas);
  }

  return (
    <aside className="panel-filtros">

      <div className="filtros-header">
        <div className="filtros-titulo">
          <h2>Filtros</h2>
        </div>

        <p className="filtros-subtitulo">
          Encontrá los artículos que buscás.
        </p>
      </div>

      <div className="filtros-grupo">
        <h3 className="filtros-label-seccion">Categorías</h3>

        <div className="select-personalizado">
          <select
            value={filtros.categoria}
            onChange={(e) => cambiarFiltro("categoria", e.target.value)}
          >
            <option value="todos">Todas las categorías</option>

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}

          </select>
        </div>
      </div>

      <div className="filtros-divisor"></div>

      <div className="filtros-grupo">
        <h3 className="filtros-label-seccion">Rareza</h3>

        {rarezas.map((rareza) => (
          <label className="checkbox-label" key={rareza.id}>

            <input
              type="checkbox"
              checked={filtros.rareza.includes(rareza.nombre)}
              onChange={() => cambiarRareza(rareza.nombre)}
            />

            <span className="checkbox-custom"></span>
            {rareza.nombre}

          </label>
        ))}

      </div>

      <div className="filtros-divisor"></div>

      <div className="filtros-grupo">
        <h3 className="filtros-label-seccion">Ordenar por</h3>

        <div className="select-personalizado">
          <select
            value={filtros.orden}
            onChange={(e) => cambiarFiltro("orden", e.target.value)}
          >
            <option value="ninguno">Sin ordenar</option>
            <option value="reciente">Más reciente</option>
            <option value="precio">Menor precio</option>
          </select>
        </div>
      </div>

    </aside>
  );
}
