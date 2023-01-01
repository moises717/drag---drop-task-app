import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: number) => {
	return `Hace ${formatDistanceToNow(date, { locale: es })}`;
};
