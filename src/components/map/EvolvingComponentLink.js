import React from 'react';
import MapPositionCalculator from '../../MapPositionCalculator';
import Inertia from './Inertia';

function EvolvingComponentLink(props) {
	const mapCalc = new MapPositionCalculator();
	const x1 = () =>
		mapCalc.maturityToX(props.startElement.maturity, props.mapDimensions.width);
	const x2 = () =>
		mapCalc.maturityToX(props.endElement.maturity, props.mapDimensions.width);
	const y1 = () =>
		mapCalc.visibilityToY(
			props.startElement.visibility,
			props.mapDimensions.height
		);
	const y2 = () =>
		mapCalc.visibilityToY(
			props.endElement.visibility,
			props.mapDimensions.height
		);
	if (props.endElement.inertia) {
		var boundary = x1;
		if (
			props.startElement.maturity >=
			mapCalc.xToMaturity(
				(props.mapDimensions.width / 20) * props.evolutionOffsets.custom,
				props.mapDimensions.width
			)
		) {
			boundary = mapCalc.xToMaturity(
				(props.mapDimensions.width / 20) * props.evolutionOffsets.custom,
				props.mapDimensions.width
			);
		}
		if (
			props.startElement.maturity >=
			mapCalc.xToMaturity(
				(props.mapDimensions.width / 20) * props.evolutionOffsets.product,
				props.mapDimensions.width
			)
		) {
			boundary = mapCalc.xToMaturity(
				(props.mapDimensions.width / 20) * props.evolutionOffsets.product,
				props.mapDimensions.width
			);
		}
		if (
			props.startElement.maturity >=
			mapCalc.xToMaturity(
				(props.mapDimensions.width / 20) * props.evolutionOffsets.commodity,
				props.mapDimensions.width
			)
		) {
			boundary = mapCalc.xToMaturity(
				(props.mapDimensions.width / 20) * props.evolutionOffsets.commodity,
				props.mapDimensions.width
			);
		}
	}

	return (
		<g>
			<line
				x1={x1()}
				y1={y1()}
				x2={x2()}
				y2={y2()}
				strokeDasharray="5 5"
				markerStart="url(#arrow)"
				stroke={props.mapStyleDefs.link.evolvedStroke}
				strokeWidth={props.mapStyleDefs.link.evolvedStrokeWidth}
			/>
			{props.endElement.inertia == false ? null : (
				<Inertia
					maturity={boundary}
					visibility={props.endElement.visibility}
					mapDimensions={props.mapDimensions}
				/>
			)}
		</g>
	);
}

export default EvolvingComponentLink;
