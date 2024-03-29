import * as d3 from "d3";

export function Tree(
    data:any,
    {
      // data is either tabular (array of objects) or hierarchy (nested objects)
      path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
      id = Array.isArray(data) ? (d:any) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
      parentId = Array.isArray(data) ? (d:any) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
      children, // if hierarchical data, given a d in data, returns its children
      tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
      sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
      label, // given a node d, returns the display name
      title, // given a node d, returns its hover text
      link, // given a node d, its link (if any)
      linkTarget = "_blank", // the target attribute for links (if any)
      width = 1000, // outer width, in pixels
      height=900, // outer height, in pixels
      r = 3, // radius of nodes
      padding = 1, // horizontal padding for first and last column
      fill = "#999", // fill for nodes
      fillOpacity, // fill opacity for nodes
      stroke = "#555", // stroke for links
      strokeWidth = 1.5, // stroke width for links
      strokeOpacity = 0.4, // stroke opacity for links
      strokeLinejoin, // stroke line join for links
      strokeLinecap, // stroke line cap for links
      halo = "#fff", // color of label halo
      haloWidth = 3, // padding around the labels
      curve = d3.curveBumpX, // curve for the link
      dyNode = 10 // vertical height of node
    }:any = {}
  ) {
    // If id and parentId options are specified, or the path option, use d3.stratify
    // to convert tabular data to a hierarchy; otherwise we assume that the data is
    // specified as an object {children} with nested objects (a.k.a. the “flare.json”
    // format), and use d3.hierarchy.
    /*let zoom = d3.zoom()
              .on('zoom', handleZoom);*/

    function handleZoom(e:any) {
      d3.select('svg g.zoomit')
      .attr('transform', e.transform);
      d3.select('svg g.zoomit2')
      .attr('transform', e.transform);
     }
     

    const root =
      path != null
        ? d3.stratify().path(path)(data)
        : id != null || parentId != null
        ? d3.stratify().id(id).parentId(parentId)(data)
        : d3.hierarchy(data, children);
  
    // Sort the nodes.
    if (sort != null) root.sort(sort);
  
    // Compute labels and titles.
    const descendants = root.descendants();
    const L = label == null ? null : descendants.map((d:any) => label(d.data, d));
  
    // Compute the layout.
    const dx = dyNode; // vertical height of node
    const dy = (width / (root.height + padding)) * 0.9; // reduced width by 90%, default is without *.9
    tree().nodeSize([dx, dy])(root);
  
    // Center the tree.
    let x0 = Infinity;
    let x1 = -x0;
    root.each((d: any) => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });
  
    // Compute the default height.
    if (height === undefined) height = x1 - x0 + dx * 2;
  
    // Use the required curve
    if (typeof curve !== "function") throw new Error(`Unsupported curve`);
    var svg:any = d3.select('#dataMind')
      .append('svg')
      .attr("viewBox", [(-dy * padding) / 2, x0 - dx, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .call(d3.zoom().on("zoom",handleZoom) as any);
  
    svg
      .append("g")
      .attr("class", "zoomit")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-opacity", strokeOpacity)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-width", strokeWidth)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr(
        "d",
        d3
          .link(curve)
          .x((d: any) => d.y)
          .y((d: any) => d.x)
      );
    const node = svg
      .append("g")
      .attr("class", "zoomit2")
      .selectAll("a")
      .data(root.descendants())
      .join("a")
      .attr("xlink:href", link == null ? null : (d:any) => link(d.data, d))
      .attr("target", link == null ? null : linkTarget)
      .attr("transform", (d:any) => `translate(${d.y},${d.x})`);
  
    node
      .append("circle")
      .attr("fill", (d:any) => (d.children ? stroke : fill))
      .attr("r", r);
  
    if (title != null) node.append("title").text((d:any) => title(d.data, d));
  
    if (L)
      node
        .append("text")
        .attr("dy", "0.32em")
        .attr("x", (d:any) => (d.children ? -6 : 6))
        .attr("text-anchor", (d:any) => (d.children ? "end" : "start"))
        .attr("paint-order", "stroke")
        .attr("stroke", halo)
        .attr("stroke-width", haloWidth)
        .text((d:any, i:any) => L[i]);
  };