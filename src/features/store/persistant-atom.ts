import { atom, WritableAtom } from 'jotai';

export function atomWithSessionStorage<T>(key: string, initialValue: T) {
	const getInitialValue = (): T => {
		const entry = sessionStorage.getItem(key);
		if (entry) {
			try {
				return JSON.parse(entry);
			} catch {
				return initialValue;
			}
		}
		return initialValue;
	};

	const baseAtom = atom<T>(getInitialValue());
	const derivedAtom: WritableAtom<T, [T], void> = atom(
		(get) => get(baseAtom),
		(_, set, newValue) => {
			set(baseAtom, newValue);
			sessionStorage.setItem(key, JSON.stringify(newValue));
		},
	);

	return derivedAtom;
}
