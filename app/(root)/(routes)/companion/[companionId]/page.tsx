import { auth, redirectToSignIn, redirectToSignUp } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import CompanionForm from './components/companion-form';

interface CompanionIdPageProps {
	params: {
		companionId: string;
	};
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
	// TODO: Check subscription
	const { userId } = auth();

	if (!userId) {
		return redirectToSignUp();
	}

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.companionId,
			userId,
		},
	});

	const categories = await prismadb.category.findMany();

	return <CompanionForm categories={categories} initialData={companion} />;
};
export default CompanionIdPage;
