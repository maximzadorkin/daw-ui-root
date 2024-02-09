import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

const useProjectId = (): string | null => {
    const params = useParams<{ id?: string }>();

    if (isEmpty(params.id)) {
        return null;
    }

    return params.id ?? null;
};

export { useProjectId };
