export default function Filtros() {
  return (
    <header className="filtros">

      <div className="inicio-texto">
        <h1>
          <span> Filtrar</span>
        </h1>
        <p>filtra para filtrar lo filtrable.</p>
      </div>

      <div className="filtros-conteiner">

        <div className="filtros-opcion">
          <label htmlFor="tipo">Categoria</label>
          <select id="tipo" name="tipo">
            <option value="">Todos</option>
            <option value="criatura">Criatura</option>
            <option value="hechizo">Hechizo</option>
            <option value="artefacto">Artefacto</option>
          </select>
        </div>

        <div className="filtros-opcion">
          <label htmlFor="tipo">Rareza</label>
          <select id="tipo" name="tipo">
            <option value="">Todos</option>
            <option value="criatura">mas barato</option>
            <option value="hechizo">mas caro</option>
          </select>
        </div>

        <div className="filtros-opcion">
          <label htmlFor="tipo">Oredenar por</label>
          <select id="tipo" name="tipo">
            <option value="">Todos</option>
            <option value="criatura">mas barato</option>
            <option value="hechizo">mas caro</option>

          </select>
        </div>

      </div>


    </header>
  );
}
