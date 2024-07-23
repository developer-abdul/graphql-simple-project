import Image from 'next/image';

export default async function Home() {
	const url = 'http://localhost:3000/graphql';
	const query = `
  query {
    getUsers {
      id
      username
      displayName
      settings {
        userId
        receiveNotifications
      }
    }
  }
`;

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	});

	const result = await res.json();

	console.log('data:', result.data);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Home</h1>
      <div className='grid gap-5'>
			{result.data.getUsers.map((user: any) => {
				console.log('user:', user.settings);
				return (
					<div key={user.id} className='flex gap-2'>
						<p>{user.username}</p>
						<p>{user.displayName}</p>
						<p>{user.settings?.receiveNotifications ? 'true' : 'false'}</p>
					</div>
				);
			})}
      </div>
		</main>
	);
}
