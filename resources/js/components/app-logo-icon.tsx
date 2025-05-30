import { SVGAttributes } from 'react';
import { Car } from 'lucide-react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <div className="bg-white rounded-full p-1">
            <Car {...props} />
        </div>
    );
}
