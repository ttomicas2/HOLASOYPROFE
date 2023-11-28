import "./MainPages.css";
import * as Icon from "react-bootstrap-icons";
import { ReactComponent as Mixing } from "./images/mixing.svg";
import { ReactComponent as SurpriseBox } from "./images/surprise-box.svg";
import { ReactComponent as Fridge } from "./images/fridge.svg";
import { useState, useRef, useContext, useEffect, useMemo } from "react";
import { 
  useVh,
  ChangePageContext,
  SetHeladeraContext,
} from "./utils.js";
import { RandomTextReveal } from "./utils.js";

import rojo from "./images/rojo.jpg";

const estates = [
  {
    tipo: "Lacteos",
    alimentos: [
      {
        nombre: "Leche",
        cantidad: 7,
        foto: "https://images.unsplash.com/photo-1576186726115-4d51596775d1?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Queso",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Queso",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Queso",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Queso",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Queso",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Queso",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Queso",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Queso",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    tipo: "Embutido",
    alimentos: [
      {
        nombre: "Pollo",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Carne",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    tipo: "Verduras",
    alimentos: [
      {
        nombre: "Lechuga",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1515356956468-873dd257f911?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nombre: "Tomate",
        cantidad: 1,
        foto: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
];

export function Home() {
  const [animar, setAnimar] = useState({
    bool: false,
    event: null,
    clicked: false,
    ref: null,
  });
  const vh = useVh();
  const changePage = useContext(ChangePageContext);

  function CirculoAnimacion({ event }) {
    const [posicion, setPosicion] = useState({ x: 0, y: 0 });
    useEffect(() => {
      setPosicion({ x: event.clientX, y: event.clientY });
    }, [event]);
    return (
      <div
        className="circulo"
        style={{
          top: `${posicion.y}px`,
          left: `${posicion.x}px`,
        }}
      ></div>
    );
  }

  function handleClick(event, ref, page) {
    if (!animar.clicked) {
      setAnimar({ bool: true, event: event, clicked: true, ref: ref });
      setTimeout(() => changePage(page), 1000);
    }
  }

  return (
    <>
      {animar.bool && <CirculoAnimacion event={animar.event} />}
      <div className="home">
        <HomeSquare
          key="recetas"
          Svg={<Mixing height={10 * vh} width={10 * vh} />}
          page="recetas"
          handleClick={handleClick}
          animar={animar}
          label={"recetas"}
        />
        <HomeSquare
          key="favs"
          Svg={<Icon.HeartFill fill="red" height={10 * vh} width={10 * vh} />}
          page="favs"
          handleClick={handleClick}
          animar={animar}
          label={"favs"}
        />
        <HomeSquare
          key="sorpresa"
          Svg={<SurpriseBox height={10 * vh} width={10 * vh} />}
          page="sorpresa"
          handleClick={handleClick}
          animar={animar}
          label={"sorpresa"}
        />
        <HomeSquare
          key="calculadora"
          Svg={<Icon.CalculatorFill height={10 * vh} width={10 * vh} />}
          page="calculadora"
          handleClick={handleClick}
          animar={animar}
          label={"calcular"}
        />
        <div className="home-square span-2 estacion">
          <span className="frutas-estacion">FRUTAS DE ESTACIÓN</span>
        </div>
        <div className="home-square span-2 healthy-center">
          <div className="healthy-circle"></div>
          WIP (Work in progress)
          <div className="healthy-circle"></div>
        </div>
      </div>
    </>
  );
}

function HomeSquare({ Svg, page, handleClick, animar, label }) {
  const ref = useRef(null);
  const hidden = animar.ref === ref ? "ocultar" : "";
  return (
    <div
      onClick={(e) => {
        handleClick(e, ref, page);
      }}
      className={`home-square ${page}`}
    >
      <div
        className={animar.ref === ref ? "transition" : undefined}
        ref={ref}
        style={
          animar.ref === ref
            ? {
                top: `${ref.current?.offsetTop}px`,
                left: `${ref.current?.offsetLeft}px`,
              }
            : {}
        }
      >
        {Svg}
      </div>
      <p className={`nombre-pag ${hidden}`}>{label.toUpperCase()}</p>
    </div>
  );
}

export function Recetas() {
  const vh = useVh();
  const [ingredientes, setIngredientes] = useState([
    {
      nombre: "Banana",
      categoria: "Fruta",
      cantidad: 2,
      foto: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);
  const [mostrar, setMostrar] = useState(false);
  const [heladera, setHeladera] = useState(false);
  /*useEffect(() => {
     buscar el la base de datos 
  }, [user]);*/

  function handleClick() {
    setMostrar(!mostrar);
  }

  function agragarIngrediente(nombre, categoria, cantidad, foto) {
    if(ingredientes.find((ingrediente) => ingrediente.nombre === nombre) === undefined){
      setIngredientes([
        ...ingredientes,
        { nombre: nombre, categoria: categoria, cantidad: cantidad, foto: foto },
      ]);
    }
  }

  function eliminarIngrediente(nombre) {
    setIngredientes(ingredientes.filter((ingrediente) => ingrediente.nombre !== nombre));
  }

  return (
    <div className="page-recetas hide-scroll-bar">
      {heladera && (
        <SetHeladeraContext.Provider value={setHeladera}>
          <Heladera miniatura={true} agregarAlimento={agragarIngrediente} />
        </SetHeladeraContext.Provider>
      )}
      <div className="icon">
        <Mixing height={10 * vh} width={10 * vh} />
      </div>
      <div className="ingredientes">
        <div className="agregar">
          <div className="mas" onClick={handleClick}>
            <Icon.Plus height={8 * vh} width={8 * vh} fill="#5f5f5f" />
          </div>
          <div
            onClick={() => {
              setHeladera(true);
            }}
            className={
              mostrar ? "agregar-heladera aparecer" : "agregar-heladera"
            }
            style={mostrar ? {} : { display: "none" }}
          >
            <Fridge height={5 * vh} width={5 * vh} fill="#5f5f5f" />
          </div>
          <div
            className={mostrar ? "agregar-lupa aparecer" : "agregar-lupa"}
            style={mostrar ? {} : { display: "none" }}
          >
            <Icon.Search height={5 * vh} width={5 * vh} fill="#5f5f5f" />
          </div>
        </div>
        {ingredientes.map((ingrediente) => {
          return (
            <Ingrediente
              key={ingrediente.nombre}
              nombre={ingrediente.nombre}
              categoria={ingrediente.categoria}
              maxCant={ingrediente.cantidad}
              foto={ingrediente.foto}
              handleEliminar={eliminarIngrediente}
            />
          );
        })}
        <div className="generar">Generar</div>
      </div>
    </div>
  );
}

function Ingrediente({ nombre, maxCant, foto, categoria, handleEliminar }) {
  const [cantidad, setCantidad] = useState(1);
  const vh = useVh();
  return (
    <div className="ingrediente">
      <div
        style={{
          backgroundImage: `url(${foto})`,
        }}
        className="ingrediente-foto"
      ></div>
      <div className="ingrediente-info">
        <span>{nombre}</span>
        <span className="categoria">{categoria}</span>
      </div>
      <div className="ingrediente-eliminar" onClick={() => {handleEliminar(nombre)}}>
        <Icon.Trash fill="#ffffff" height={4*vh} width={4*vh}/>
      </div>
      <div className="ingrediente-cantidad">
        <div
          className="triangulo-arriba"
          onClick={() => {
            if (cantidad < maxCant) {
              setCantidad(cantidad + 1);
            }
          }}
        ></div>
        <div className="cantidad">
          <span>{cantidad}</span>
        </div>
        <div
          className="triangulo-abajo"
          onClick={() => {
            if (cantidad > 1) {
              setCantidad(cantidad - 1);
            }
          }}
        ></div>
      </div>
    </div>
  );
}

export function Favs() {
  const vh = useVh();
  const recetas = [
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Milanesa con pure y papas fritas",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
    {
      nombre: "Pastel de papa",
      descripcion: "Pure arriba y carne picada",
      ingredientes: [],
      foto: null,
    },
  ];
  /*useEffect(() => {
     buscar el la base de datos 
  }, [user]);*/
  return (
    <div className="page-favs">
      <div className="icon">
        <Icon.HeartFill fill="red" height={10 * vh} width={10 * vh} />
      </div>
      <div style={{ fontWeight: "900", fontSize: "1.5rem" }}>Favs</div>
      <div className="grid-favoritos-recetas hide-scroll-bar">
        {recetas.map((receta) => {
          return (
            <RecetaFav
              key={receta.nombre}
              nombre={receta.nombre}
              descripcion={receta.descripcion}
              foto={receta.foto}
            />
          );
        })}
      </div>
    </div>
  );
}

function RecetaFav({ nombre, foto, descripcion }) {
  const [carta, setCarta] = useState(false);

  return (
    <div className="receta-fav" onClick={() => {setCarta(!carta)}} >
      { carta && <Carta nombre={nombre} descripcion={descripcion} cantidad={0} foto={foto} />}
      <div style={{ backgroundImage: `url(${rojo})` }} className="foto"></div>
      <div className="nombre">{nombre}</div>
    </div>
  );
}

export function Sorpresa() {
  const vh = useVh();
  const [randomIndex, setRandomIndex] = useState(0);
  const [previousRandom, setPreviousRandom] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [favorito, setFavorito] = useState(false);
  const ingredienteAleatorio = useMemo(() => {
    /*fetch()*/
    return {nombre: "Pollo a la mostaza todo", descripcion: "Pollo con mostaza", foto: "https://media.istockphoto.com/id/1391226577/es/foto/miel-y-pollo-glaseado-de-dijon-pollo-al-horno.jpg?s=612x612&w=0&k=20&c=BjHjJOEgkvs5WBUQXNqV9vqtJE-7UOqnOzX7t7Oo5oQ="}
  }, [])
  const fotos = useMemo(() => {
    /*fetch()*/
    return ["https://assets.elgourmet.com/wp-content/uploads/2023/11/PICANA-ASADA-CON-REPOLLOS-Y-SALSA-VERDE-7-1024x668.jpg.webp",
            "https://assets.elgourmet.com/wp-content/uploads/2023/11/PESCADO-EN-ESCABECHE-7-1024x683.jpg.webp",
            "https://assets.elgourmet.com/wp-content/uploads/2023/11/OSOBUCO-1-1024x683.jpg.webp",
            ];
  });

  useEffect(() => {
    setPreviousRandom(fotos[randomIndex]);
    setCurrentImage(fotos[randomIndex+1]);
    const interval = setInterval(() => {
      setRandomIndex(r => r + 1);
      setPreviousRandom(fotos[randomIndex]);
      setCurrentImage(fotos[randomIndex+1]);
    }, 250);
    if(randomIndex === fotos.length){
      setPreviousRandom(fotos[randomIndex-1]);
      setCurrentImage(ingredienteAleatorio.foto);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  function handleFavorito(){
    setFavorito(!favorito);
  }

  return (
    <div className="page-sorpresa">
      <div className="icon">
        <SurpriseBox height={10 * vh} width={10 * vh} />
      </div>
      <h1 style={{paddingBottom: "1vh"}} >Sorpresa</h1>
      <div className="sorpresa-card">
        <div className="sorpresa-foto">
        <div className="foto" style={{backgroundImage: `url(${previousRandom})`}}></div>
        <div className="foto animar" style={{backgroundImage: `url(${currentImage})`}}></div>
        </div>
        <div className="sorpresa-info">
        <RandomTextReveal text={ingredienteAleatorio.nombre} />
        <RandomTextReveal text={ingredienteAleatorio.descripcion} />
        <div className="sorpresa-fav" >
          { favorito
           ? 
           <Icon.HeartFill onClick={handleFavorito} fill="red" height={4*vh} width={4*vh}/>
           :
           <Icon.Heart onClick={handleFavorito} fill="#ffffff" height={4*vh} width={4*vh}/>
          }
        </div>
        </div>
      </div>
    </div>
  );
}

export function Calculadora() {
  const vh = useVh();
  return (
    <div className="page-calculadora">
      <div className="icon">
        <a href="http://localhost:6023/ingredientes"><Icon.CalculatorFill className="calculatorIcon" height={10 * vh} width={10 * vh} /></a>
      </div>
    </div>
  );
}

export function Setting({ settingPage }) {
  return (
    <div className="setting-page">
      {settingPage === "" && (
        <>
          <HeaderSetting label="Configuración" />
          <ItemSetting label="Info Legal" />
          <div className="setting-divisor"></div>
          <ItemSetting label="Info Legal" />
          <div className="setting-divisor"></div>
          <ItemSetting label="Info Legal" />
          <div className="setting-divisor"></div>
          <ItemSetting label="Info Legal" />
          <div className="setting-divisor"></div>
          <ItemSetting label="Info Legal" />
          <div className="setting-divisor"></div>
          <HeaderSetting label="Soporte" />
          <ItemSetting label="Info Legal" />
          <div className="setting-divisor"></div>
          <ItemSetting label="Info Legal" />
          <div className="setting-divisor"></div>
          <ItemSetting label="Info Legal" />
          <div className="setting-divisor"></div>
        </>
      )}
    </div>
  );
}

function ItemSetting({ label }) {
  return (
    <div className="setting-item">
      <div>{label}</div>
      <div style={{ textAlign: "right" }}>
        <Icon.ArrowRight />
      </div>
    </div>
  );
}

function HeaderSetting({ label }) {
  return <div className="setting-header">{label}</div>;
}

export function Heladera({ miniatura, agregarAlimento }) {
  /*const user = useContext(UserContext);*/
  const vh = useVh();
  const setHeladera = useContext(SetHeladeraContext);
  const estantes = useEffect(
    () => {
      /* buscar el la base de datos */
    },
    [
      /*user*/
    ]
  );
  if (!miniatura) {
    return (
      <div className="heladera-home">
        <div className="heladera-divisor" />
        {estates.map((estante) => (
          <>
            <Estante
              key={estante.tipo}
              tipo={estante.tipo}
              alimentos={estante.alimentos}
            />
            <div className="heladera-divisor" />
          </>
        ))}
      </div>
    );
  }
  return (
    <div className="heladera-home-miniatura">
      <Icon.X
        height={3*vh}
        width={3*vh}
        className="salir-heladera-mini"
        onClick={() => {
          setHeladera(false);
        }}
      />
      {estates.map((estante) => (
        <>
          <Estante
            key={estante.tipo}
            tipo={estante.tipo}
            alimentos={estante.alimentos}
            handleClick={agregarAlimento}
          />
          <div className="heladera-divisor" />
        </>
      ))}
    </div>
  );
}

function Estante({ tipo, alimentos }) {
  return (
    <div className="estante">
      <h4 style={{ marginBottom: `0.4rem` }}>{tipo}</h4>
      <div className="carrousel hide-scroll-bar">
        {alimentos.map((alimento) => {
          return (
            <Alimento
              key={alimento.nombre}
              nombre={alimento.nombre}
              categoria={tipo}
              cantidad={alimento.cantidad}
              foto={alimento.foto}
            />
          );
        })}
      </div>
    </div>
  );
}

function Alimento({ nombre, categoria, cantidad, foto}) {
  const setHeladera = useContext(SetHeladeraContext);
  const [carta, setCarta] = useState(false);
  return (
    <div
      onClick={() => {
        setCarta(!carta);
        setHeladera(false);
      }}
      style={{ scrollSnapAlign: "start" }}
      className="alimento"
    >
      { carta && <Carta nombre={nombre} descripcion={categoria} cantidad={cantidad} foto={foto} />}
      <div
        style={{ backgroundImage: `url(${foto})` }}
        className="alimento-foto"
      >
        <div className="alimento-cantidad">{cantidad}</div>
      </div>
      <div className="alimento-nombre">{nombre}</div>
    </div>
  );
}

function Carta({ nombre, foto, descripcion, cantidad}){
  const [favorito, setFavorito] = useState(false);
  const vh = useVh();

  function handleFavorito(){
    setFavorito(!favorito);
  }

  return (
    <div className="card">
      <div className="foto" style={{backgroundImage: `url(${foto})`}}></div>
      <div className="sorpresa-info">
      <RandomTextReveal text={nombre} />
      <RandomTextReveal text={descripcion} />
      <div className="sorpresa-fav" >
        { favorito
          ? 
          <Icon.HeartFill onClick={handleFavorito} fill="red" height={4*vh} width={4*vh}/>
          :
          <Icon.Heart onClick={handleFavorito} fill="#ffffff" height={4*vh} width={4*vh}/>
        }
      </div>
      </div>
    </div>
  );
}