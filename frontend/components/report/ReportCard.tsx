interface Props {

    title: string;

    children: React.ReactNode;

}

export default function ReportCard({

    title,

    children,

}: Props) {

    return (

        <div className="rounded-xl border bg-white shadow-sm p-6">

            <h2 className="text-2xl font-semibold mb-5">

                {title}

            </h2>

            {children}

        </div>

    );

}