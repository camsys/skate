import React from "react"

import {
  Orientation,
  Size,
  VehicleIcon,
  VehicleIconSvgNode,
} from "./vehicleIcon"

const VehicleIconGallery = () => (
  <div style={{ flex: "1 1 auto", marginLeft: "12.5rem" }}>
    <div style={{ display: "flex" }}>
      <VehicleIcon size={Size.Small} orientation={Orientation.Up} />
      <VehicleIcon
        size={Size.Small}
        orientation={Orientation.Right}
        variant="1"
      />
      <VehicleIcon size={Size.Small} orientation={Orientation.Down} />
      <VehicleIcon
        size={Size.Small}
        orientation={Orientation.Left}
        variant="2"
      />
      <VehicleIcon size={Size.Medium} orientation={Orientation.Up} />
      <VehicleIcon
        size={Size.Medium}
        orientation={Orientation.Right}
        variant="3"
      />
      <VehicleIcon size={Size.Medium} orientation={Orientation.Down} />
      <VehicleIcon
        size={Size.Medium}
        orientation={Orientation.Left}
        variant="4"
      />
      <VehicleIcon size={Size.Large} orientation={Orientation.Up} />
      <VehicleIcon
        size={Size.Large}
        orientation={Orientation.Right}
        variant="5"
      />
      <VehicleIcon size={Size.Large} orientation={Orientation.Down} />
      <VehicleIcon
        size={Size.Large}
        orientation={Orientation.Left}
        variant="6"
      />
    </div>
    <div style={{ display: "flex" }}>
      <VehicleIcon
        size={Size.Small}
        orientation={Orientation.Up}
        label="1828"
        variant="7"
      />
      <VehicleIcon
        size={Size.Small}
        orientation={Orientation.Right}
        label="1828"
      />
      <VehicleIcon
        size={Size.Small}
        orientation={Orientation.Down}
        label="1828"
        variant="8"
      />
      <VehicleIcon
        size={Size.Small}
        orientation={Orientation.Left}
        label="1828"
      />
      <VehicleIcon
        size={Size.Medium}
        orientation={Orientation.Up}
        label="1828"
        variant="9"
      />
      <VehicleIcon
        size={Size.Medium}
        orientation={Orientation.Right}
        label="1828"
      />
      <VehicleIcon
        size={Size.Medium}
        orientation={Orientation.Down}
        label="1828"
        variant="A"
      />
      <VehicleIcon
        size={Size.Medium}
        orientation={Orientation.Left}
        label="1828"
      />
      <VehicleIcon
        size={Size.Large}
        orientation={Orientation.Up}
        label="1828"
        variant="B"
      />
      <VehicleIcon
        size={Size.Large}
        orientation={Orientation.Right}
        label="1828"
      />
      <VehicleIcon
        size={Size.Large}
        orientation={Orientation.Down}
        label="1828"
        variant="C"
      />
      <VehicleIcon
        size={Size.Large}
        orientation={Orientation.Left}
        label="1828"
      />
    </div>
    <svg style={{ width: 600, height: 200 }}>
      <line x1="0" y1="50" x2="600" y2="50" stroke="lightgray" />
      <g transform="translate(25, 50)">
        <VehicleIconSvgNode
          size={Size.Small}
          orientation={Orientation.Up}
          variant="D"
        />
      </g>
      <g transform="translate(75, 50)">
        <VehicleIconSvgNode size={Size.Small} orientation={Orientation.Right} />
      </g>
      <g transform="translate(125, 50)">
        <VehicleIconSvgNode size={Size.Small} orientation={Orientation.Down} />
      </g>
      <g transform="translate(175, 50)">
        <VehicleIconSvgNode
          size={Size.Small}
          orientation={Orientation.Left}
          variant="E"
        />
      </g>
      <g transform="translate(225, 50)">
        <VehicleIconSvgNode size={Size.Medium} orientation={Orientation.Up} />
      </g>
      <g transform="translate(275, 50)">
        <VehicleIconSvgNode
          size={Size.Medium}
          orientation={Orientation.Right}
        />
      </g>
      <g transform="translate(325, 50)">
        <VehicleIconSvgNode
          size={Size.Medium}
          orientation={Orientation.Down}
          variant="F"
        />
      </g>
      <g transform="translate(375, 50)">
        <VehicleIconSvgNode size={Size.Medium} orientation={Orientation.Left} />
      </g>
      <g transform="translate(425, 50)">
        <VehicleIconSvgNode size={Size.Large} orientation={Orientation.Up} />
      </g>
      <g transform="translate(475, 50)">
        <VehicleIconSvgNode
          size={Size.Large}
          orientation={Orientation.Right}
          variant="G"
        />
      </g>
      <g transform="translate(525, 50)">
        <VehicleIconSvgNode size={Size.Large} orientation={Orientation.Down} />
      </g>
      <g transform="translate(575, 50)">
        <VehicleIconSvgNode size={Size.Large} orientation={Orientation.Left} />
      </g>

      <line x1="0" y1="150" x2="600" y2="150" stroke="lightgray" />
      <g transform="translate(25, 150)">
        <VehicleIconSvgNode
          size={Size.Small}
          orientation={Orientation.Up}
          label="1828"
        />
      </g>
      <g transform="translate(75, 150)">
        <VehicleIconSvgNode
          size={Size.Small}
          orientation={Orientation.Right}
          label="1828"
          variant="W"
        />
      </g>
      <g transform="translate(125, 150)">
        <VehicleIconSvgNode
          size={Size.Small}
          orientation={Orientation.Down}
          label="1828"
        />
      </g>
      <g transform="translate(175, 150)">
        <VehicleIconSvgNode
          size={Size.Small}
          orientation={Orientation.Left}
          label="1828"
        />
      </g>
      <g transform="translate(225, 150)">
        <VehicleIconSvgNode
          size={Size.Medium}
          orientation={Orientation.Up}
          label="1828"
          variant="X"
        />
      </g>
      <g transform="translate(275, 150)">
        <VehicleIconSvgNode
          size={Size.Medium}
          orientation={Orientation.Right}
          label="1828"
        />
      </g>
      <g transform="translate(325, 150)">
        <VehicleIconSvgNode
          size={Size.Medium}
          orientation={Orientation.Down}
          label="1828"
        />
      </g>
      <g transform="translate(375, 150)">
        <VehicleIconSvgNode
          size={Size.Medium}
          orientation={Orientation.Left}
          label="1828"
          variant="Y"
        />
      </g>
      <g transform="translate(425, 150)">
        <VehicleIconSvgNode
          size={Size.Large}
          orientation={Orientation.Up}
          label="1828"
        />
      </g>
      <g transform="translate(475, 150)">
        <VehicleIconSvgNode
          size={Size.Large}
          orientation={Orientation.Right}
          label="1828"
        />
      </g>
      <g transform="translate(525, 150)">
        <VehicleIconSvgNode
          size={Size.Large}
          orientation={Orientation.Down}
          label="1828"
          variant="Z"
        />
      </g>
      <g transform="translate(575, 150)">
        <VehicleIconSvgNode
          size={Size.Large}
          orientation={Orientation.Left}
          label="1828"
        />
      </g>
    </svg>
  </div>
)

export default VehicleIconGallery
