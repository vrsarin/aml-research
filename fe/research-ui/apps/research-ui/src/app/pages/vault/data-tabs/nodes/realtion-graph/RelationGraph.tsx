import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const RelationGraph = () => {
  const ref = useRef(null);

  useEffect(() => {
    const data = [12, 5, 6, 6, 9, 10];

    const svg = d3.select(ref.current);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => 300 - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'green');
  }, []);
  return <svg width={400} height={100} viewBox="0 0 100 50" ref={ref} />;
};

export default RelationGraph;
