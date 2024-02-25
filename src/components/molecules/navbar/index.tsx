// main tools
import { useState } from 'react';

// components
import { Drawer, DrawerContent, DrawerPortal } from '@/components/atoms/drawer';
import { Typography } from '@/components/atoms/typography';
import { Button } from '@/components/atoms/button';
import { Todo } from '@/components/organisms/todo';

// utils
import { cn } from '@/lib/utils';

// styles
import { ListBulletIcon } from '@radix-ui/react-icons';
import classes from './styles.module.css';

// types
import { FC, Fragment } from 'react';

export const Navbar: FC = () => {
	const [showTaskList, setShowTaskList] = useState(false);

	return (
		<Fragment>
			<nav className={cn('bg-background', classes.container)}>
				<div className='flex flex-col items-center gap-1'>
					<Button
						size='icon'
						variant='outline'
						onClick={() => setShowTaskList(true)}
					>
						<ListBulletIcon className='h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all text-foreground' />
					</Button>
					<Typography className='text-foreground'>Tasks</Typography>
				</div>
			</nav>

			<Drawer open={showTaskList} onClose={() => setShowTaskList(false)}>
				<DrawerPortal>
					<DrawerContent className={cn('', classes.drawer_content)}>
						<Todo setShowTaskList={setShowTaskList} />
					</DrawerContent>
				</DrawerPortal>
			</Drawer>
		</Fragment>
	);
};
