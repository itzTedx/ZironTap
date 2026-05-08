// https://shadcn-map.vercel.app/docs/examples/search-control

import type { ComponentProps } from "react";

import { useStore } from "@tanstack/react-form-nextjs";

import { Field, FieldError } from "@ziron/ui/components/field";
import {
	Map,
	MapFullscreenControl,
	MapLocateControl,
	MapMarker,
	MapPopup,
	MapSearchControl,
	MapTileLayer,
	MapZoomControl,
} from "@ziron/ui/components/map";
import { toastManager } from "@ziron/ui/components/toast";

import { useFieldContext } from "../hooks/form-contexts";

interface InputFieldProps extends ComponentProps<typeof Map> {
	className?: string;
}

export function MapField({ placeholder, center, className, ...rest }: InputFieldProps) {
	const field = useFieldContext();

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field className={className} data-invalid={isInvalid}>
			<Map {...rest} center={center}>
				<MapTileLayer />
				<MapLocateControl
					onLocationError={(error) =>
						toastManager.add({
							type: "error",
							title: "Couldn't get location info",
							description: error.message,
						})
					}
					onLocationFound={(location) => field.handleChange(location.latlng)}
					type="button"
				/>
				<MapSearchControl />
				<MapFullscreenControl />
				<MapZoomControl position="bottom-10 right-1" />
				<MapMarker position={center}>
					<MapPopup>A map component for shadcn/ui.</MapPopup>
				</MapMarker>
			</Map>

			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
