import { SVGProps } from 'react';
import { ArrowDown24 } from './ArrowDownIcon';
import { Check12 } from './CheckIcon';
import { Close12 } from './CloseIcon';
import { HelpOutline16, HelpOutline24 } from './HelpOutlineIcon';
import { Minus8, Minus12 } from './MinusIcon';
import { NotificationOutline24 } from './NotificationOulineIcon';
import { Setting24 } from './SettingIcon';

export const icons: Record<
	string,
	Record<number, React.ComponentType<SVGProps<SVGSVGElement>>>
> = {
	ArrowDown: {
		24: ArrowDown24,
	},
	Check: {
		12: Check12,
	},
	Close: {
		12: Close12,
	},
	HelpOutline: {
		16: HelpOutline16,
		24: HelpOutline24,
	},
	Minus: {
		8: Minus8,
		12: Minus12,
	},
	NotificationOutline: {
		24: NotificationOutline24,
	},
	Setting: {
		24: Setting24,
	},
};