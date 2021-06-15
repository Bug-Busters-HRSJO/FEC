import React, { useState, useEffect } from 'react';
import Atelier from '../../Atelier.js';

const ComparisonModal = ({ productId, relatedId, trigger }) => {
  const [allChars, setAllChars] = useState([]);
  const [prodChars, setProd] = useState([]);
  const [relatedChars, setRelated] = useState([]);
  const [itemCheck, setCheck] = useState({ product: [], related: [] });
  const [itemName, setName] = useState({ product: 'Product 1', related: 'Product 2' });

  const fetchItems = async () => {
    let productData = await Atelier.getInfo(productId);
    let relatedData = await Atelier.getInfo(relatedId);

    const pd = productData.features;
    const rd = relatedData.features;
    const all = pd.concat(rd);

    setProd(transformFeatures(pd));
    setRelated(transformFeatures(rd));
    setAllChars(transformFeatures(all));
    setName({
      product: productData.name,
      related: relatedData.name
    });
  };

  const transformFeatures = (array) => {
    let transformed = [];

    array.forEach((item) => {
      item.value === null
        ? transformed.push(`${item.feature}`)
        : transformed.push(`${item.feature} ─ ${item.value}`);
    });

    return transformed;
  }

  const checkFeatures = (array1, array2) => {
    let result = [];

    array1.forEach((item) => {
      array2.includes(item)
        ? result.push('✓')
        : result.push(' ');
    });

    return result;
  }

  useEffect(() => {
    fetchItems().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, [relatedId]);

  useEffect(() => {
    setCheck({
      product: checkFeatures(allChars, prodChars),
      related: checkFeatures(allChars, relatedChars)
    });
  }, [allChars]);

  return (
    <div className='c-modal' onClick={trigger}>
      <p id='c-title'>Comparing</p>
      <table>
        <th className="c-left">{itemName.product}</th>
        <th className="c-mid"></th>
        <th className="c-right">{itemName.related}</th>
        <tbody>
          {allChars.map((item, i) => (
            <tr key={i}>
              <td className="c-left">{itemCheck.product[i]}</td>
              <td className="c-mid">{item}</td>
              <td className="c-right">{itemCheck.related[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default ComparisonModal;