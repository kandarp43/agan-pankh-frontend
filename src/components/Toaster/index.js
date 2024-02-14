import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useQueryClient } from 'react-query'

function Toaster({ limit }) {
	const [messages, setMessages] = useState([])
	const queryClient = useQueryClient()

	function handleMultiToast(toast) {
		const newMessages = [...messages]
		toast.timeout = () =>
			setTimeout(() => {
				setMessages((messages) =>
					messages?.filter((message) => message?.id !== toast?.id)
				)
			}, 5000)

		if (newMessages?.length >= limit) {
			const removedMessage = newMessages.shift()
			clearTimeout(removedMessage.timeout)
		}
		newMessages.push(toast)
		setMessages(newMessages)
		toast.timeout()
	}

	function handleClose(id) {
		const message = messages?.find((message) => message?.id === id)
		clearTimeout(message.timeout)
		setMessages((message) => message?.filter((message) => message?.id !== id))
	}

	useQuery('toast', () => setMessages([]), {
		onSuccess: () => {
			handleMultiToast({
				id: new Date().getTime(),
				message: queryClient.getQueryData('message')?.message,
				type: queryClient.getQueryData('message')?.type,
				isOpen: true,
			})
		},
	})

	function toastStyle(toastType) {
		const types = {
			success: '#27B98D',
			error: '#ff5658',
			warning: '#ffad0d',
		}
		const backgroundColor = {
			success: '#F1FFFB',
			error: '#FFF8F8',
			warning: '#FFF8F8',
		}

		return {
			color: types[toastType],
			backgroundColor: backgroundColor[toastType],
		}
	}
	return (
		<div
			style={{ zIndex: 1400 }}
			className='p-3 zindex-fixed fixed top-2 right-2'
		>
			{messages.map(({ message, id, type, isOpen }) => {
				return (
					message &&
					isOpen && (
						<div
							key={id}
							onClose={() => handleClose(id)}
							className='p-2 m-1'
							style={{
								backgroundColor: toastStyle(type)?.backgroundColor,
								border: `1px solid ${toastStyle(type)?.color}`,
								boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
								borderRadius: '8px',
								userSelect: 'none',
								color: toastStyle(type)?.color,
							}}
						>
							<div className='flex justify-between items-center '>
								<div className='flex items-center'>{message}</div>
								{/* <div onClick={() => handleClose(id)}>cancel</div> */}
							</div>
						</div>
					)
				)
			})}
		</div>
	)
}

export default memo(Toaster)

Toaster.propTypes = {
	limit: PropTypes.number,
}
