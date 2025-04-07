import { memo } from "react";
// not ideal, should optimise, import size is 1.3M / 426.8K zipped
import * as FavIcons from 'react-icons/fa';
import { colours } from "assets/index";

type IconProps = {
    type: keyof typeof FavIcons;
    colour?: keyof typeof colours;
}

export const Icon = memo((props: IconProps) => {
    const { type, colour } = props;
    const IconComponent = FavIcons[type];

    return (<IconComponent size={24} fontWeight={200} color={colours[colour!] || colours.gray} />);
});