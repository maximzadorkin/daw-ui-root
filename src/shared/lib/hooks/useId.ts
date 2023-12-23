import { useMemo } from 'react';
import { v4 } from 'uuid';

const useId = () => useMemo(() => v4(), []);

export { useId };
