document.addEventListener("DOMContentLoaded", () => {
  const mapaContainer = document.getElementById("mapa");
  const tooltip = document.getElementById("tooltip");
  const detalleEstado = document.getElementById("detalle-estado");
  const itemsListaEstados = document.querySelectorAll(".experiencia__lista-estados li[data-estado]");

  if (!mapaContainer || !tooltip || typeof d3 === "undefined") {
    return;
  }

  const width = Math.min(900, Math.max(300, mapaContainer.clientWidth || 800));
  const height = width < 600 ? 360 : 500;

  const svg = d3
    .select("#mapa")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  svg.on("dblclick", (event) => event.preventDefault());

  const g = svg.append("g");

  function normalizarEstado(valor) {
    return (valor || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function resaltarEstadoEnLista(estadoSeleccionado) {
    itemsListaEstados.forEach((item) => {
      const coincide = normalizarEstado(item.dataset.estado) === normalizarEstado(estadoSeleccionado);
      item.classList.toggle("lista__activa", coincide);
    });
  }

  function ocultarDetalleEstado() {
    d3.selectAll(".estado")
      .classed("activo", false)
      .interrupt()
      .transition()
      .duration(180)
      .attr("transform", null);

    tooltip.style.display = "none";
    resaltarEstadoEnLista("");
  }

  function renderDetalleEstado(estado, info, feature, pathGenerator) {
    if (!detalleEstado) {
      return;
    }

    const datosHtml = info
      ? `
        <strong>${estado}</strong><br>
        <strong>Descripción:</strong> ${info.descripcion}<br>
    
      `
      : `<strong>${estado}</strong><br>No hay informacion disponible para este estado.`;

    detalleEstado.innerHTML = `
      <div style="display:flex; gap:14px; align-items:center; flex-wrap:wrap;">
        <svg id="estado-preview" width="170" height="120" aria-label="Vista del estado seleccionado"></svg>
        <div>${datosHtml}</div>
      </div>
    `;

    const estadoSvg = d3.select("#estado-preview");
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(feature);
    const margen = 8;
    const vbX = x0 - margen;
    const vbY = y0 - margen;
    const vbW = Math.max(x1 - x0 + margen * 2, 1);
    const vbH = Math.max(y1 - y0 + margen * 2, 1);

    estadoSvg
      .attr("viewBox", `${vbX} ${vbY} ${vbW} ${vbH}`)
      .style("background", "#f8fafc")
      .style("border", "1px solid #d6deea")
      .style("border-radius", "8px");

    estadoSvg
      .append("path")
      .datum(feature)
      .attr("d", pathGenerator)
      .attr("fill", "#2c3e50")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5);
  }

  const estados = {
    "Aguascalientes": { descripcion: "", presencia: "very-high" },
    "Baja California": { descripcion: "", presencia: "otros" },
    "Baja California Sur": { descripcion: "", presencia: "high"},
    "Campeche": { descripcion: "", presencia: "otros" },
    "Chihuahua": { descripcion: "", presencia: "PAN" },
    "Colima": { descripcion: "", presencia: "otros" },
    "Guerrero": { descripcion: "", presencia: "otros" },
    "Michoacan": { descripcion: "", presencia: "otros" },
    "Puebla": { descripcion: "", presencia: "very-high" },
    "Nayarit": { descripcion: "", presencia: "otros" },
    "Nuevo Leon": { descripcion: "", presencia: "MC" },
    "Queretaro": { descripcion: "", presencia: "very-high" },
    "Quintana Roo": { descripcion: "", presencia: "high" },
    "Veracruz": { descripcion: "", presencia: "low-medium" },
    "San Luis Potosi": { descripcion: "", presencia: "PVEM" },
    "Sinaloa": { descripcion: "", presencia: "otros" },
    "Sonora": { descripcion: "", presencia: "otros" },
    "Oaxaca": { descripcion: "", presencia: "medium" },
    "Tabasco": { descripcion: "", presencia: "high" },
    "Tlaxcala": { descripcion: "", presencia: "low" },
    "Zacatecas": { descripcion: "", presencia: "otros" }
  };

  fetch("https://raw.githubusercontent.com/angelnmara/geojson/master/mexicoHigh.json")
    .then((res) => res.json())
    .then((data) => {
      const projection = d3.geoMercator().fitSize([width, height], data);
      const path = d3.geoPath().projection(projection);

      g.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", (d) => {
          const estado = d.properties.name;
          const info = estados[estado];
          let presenciaClass = "otros";

          if (info) {
            switch (info.presencia.toLowerCase()) {
              case "very-high":
                presenciaClass = "very-high";
                break;
              case "high":
                presenciaClass = "high";
                break;
              case "medium":
                presenciaClass = "medium";
                break;
              case "low":
                presenciaClass = "low";
              break;
              case "low-medium":
                presenciaClass = "low-medium";
              break;
              default:
                presenciaClass = "otros";
            }
          }

          return `estado ${presenciaClass}`;
        })
        .on("mousemove", (event, d) => {
          const estado = d.properties.name;
          const info = estados[estado];

          //tooltip.style.display = "block";

          /*if (info) {
            tooltip.innerHTML = `
              <strong>${estado}</strong><br>
            `;
          } else {
            tooltip.textContent = estado;
          }*/

          tooltip.style.left = event.pageX + 10 + "px";
          tooltip.style.top = event.pageY + 10 + "px";
        })
        .on("mouseleave", () => {
          tooltip.style.display = "none";
        })
        .on("click", function (event, d) {
          d3.selectAll(".estado")
            .classed("activo", false)
            .interrupt()
            .transition()
            .duration(180)
            .attr("transform", null);

          const estadoSeleccionado = d3.select(this);
          estadoSeleccionado
            .classed("activo", true)
            .raise()
            .interrupt()
            .transition()
            .duration(260)
            .attr("transform", () => {
              const [cx, cy] = path.centroid(d);
              return `translate(${cx},${cy}) scale(1.5) translate(${-cx},${-cy})`;
            });

          const estado = d.properties.name;
          const info = estados[estado];
          resaltarEstadoEnLista(estado);
          renderDetalleEstado(estado, info, d, path);
        });

      document.addEventListener("click", (event) => {
        if (!mapaContainer.contains(event.target)) {
          ocultarDetalleEstado();
        }
      });
    })
    .catch(() => {
      if (detalleEstado) {
        detalleEstado.textContent = "No se pudo cargar el mapa interactivo.";
      }
    });
});
