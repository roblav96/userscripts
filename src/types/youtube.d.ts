interface Element {
	data: YouTubeRendererData
}

interface YouTubeRendererData {
	badges: {
		metadataBadgeRenderer: {
			label: string
			style: string
			trackingParams: string
		}
	}[]
	buttons: {
		toggleButtonRenderer: {
			defaultServiceEndpoint: {
				addUpcomingEventReminderEndpoint: {
					params: string
				}
				clickTrackingParams: string
				commandMetadata: {
					webCommandMetadata: {
						apiUrl: string
						sendPost: boolean
						url: string
					}
				}
			}
			defaultText: {
				simpleText: string
			}
			defaultTooltip: string
			isDisabled: boolean
			isToggled: boolean
			style: {
				styleType: string
			}
			toggledServiceEndpoint: {
				clickTrackingParams: string
				commandMetadata: {
					webCommandMetadata: {
						apiUrl: string
						sendPost: boolean
						url: string
					}
				}
				removeUpcomingEventReminderEndpoint: {
					params: string
				}
			}
			toggledText: {
				simpleText: string
			}
			trackingParams: string
		}
	}[]
	channelThumbnailSupportedRenderers: {
		channelThumbnailWithLinkRenderer: {
			accessibility: {
				accessibilityData: {
					label: string
				}
			}
			navigationEndpoint: {
				browseEndpoint: {
					browseId: string
					canonicalBaseUrl: string
				}
				clickTrackingParams: string
				commandMetadata: {
					webCommandMetadata: {
						rootVe: number
						url: string
						webPageType: string
					}
				}
			}
			thumbnail: {
				thumbnails: {
					height: number
					url: string
					width: number
				}[]
			}
		}
	}
	descriptionSnippet: {
		simpleText: string
	}
	isWatched: boolean
	lengthText: {
		accessibility: {
			accessibilityData: {
				label: string
			}
		}
		simpleText: string
	}
	longBylineText: {
		runs: {
			navigationEndpoint: {
				browseEndpoint: {
					browseId: string
					canonicalBaseUrl: string
				}
				clickTrackingParams: string
				commandMetadata: {
					webCommandMetadata: {
						rootVe: number
						url: string
						webPageType: string
					}
				}
			}
			text: string
		}[]
	}
	menu: {
		menuRenderer: {
			accessibility: {
				accessibilityData: {
					label: string
				}
			}
			items: {
				menuServiceItemRenderer: {
					hasSeparator: boolean
					icon: {
						iconType: string
					}
					serviceEndpoint: {
						addToPlaylistServiceEndpoint: {
							videoId: string
						}
						clickTrackingParams: string
						commandMetadata: {
							webCommandMetadata: {
								apiUrl: string
								sendPost: boolean
								url: string
							}
						}
						dismissalEndpoint: {
							actions: {
								replaceEnclosingAction: {
									item: {
										notificationMultiActionRenderer: {
											responseText: {
												accessibility: {
													accessibilityData: {
														label: string
													}
												}
												runs: {
													text: string
												}[]
											}
											trackingParams: string
										}
									}
								}
							}[]
							dismissal: string
						}
						playlistEditEndpoint: {
							actions: {
								action: string
								addedVideoId: string
							}[]
							playlistId: string
						}
						signalServiceEndpoint: {
							actions: {
								addToPlaylistCommand: {
									listType: string
									onCreateListCommand: {
										clickTrackingParams: string
										commandMetadata: {
											webCommandMetadata: {
												apiUrl: string
												sendPost: boolean
												url: string
											}
										}
										createPlaylistServiceEndpoint: {
											hack: boolean
											params: string
											videoIds: string[]
										}
									}
									openListPanel: boolean
									openMiniplayer: boolean
									videoId: string
									videoIds: string[]
								}
							}[]
							signal: string
						}
					}
					text: {
						runs: {
							text: string
						}[]
					}
					trackingParams: string
				}
			}[]
			trackingParams: string
		}
	}
	navigationEndpoint: {
		clickTrackingParams: string
		commandMetadata: {
			webCommandMetadata: {
				rootVe: number
				url: string
				webPageType: string
			}
		}
		watchEndpoint: {
			startTimeSeconds: number
			videoId: string
		}
	}
	ownerBadges: {
		metadataBadgeRenderer: {
			icon: {
				iconType: string
			}
			style: string
			tooltip: string
			trackingParams: string
		}
	}[]
	ownerText: {
		runs: {
			navigationEndpoint: {
				browseEndpoint: {
					browseId: string
					canonicalBaseUrl: string
				}
				clickTrackingParams: string
				commandMetadata: {
					webCommandMetadata: {
						rootVe: number
						url: string
						webPageType: string
					}
				}
			}
			text: string
		}[]
	}
	publishedTimeText: {
		simpleText: string
	}
	richThumbnail: {
		movingThumbnailRenderer: {
			enableHoveredLogging: boolean
			enableOverlay: boolean
			movingThumbnailDetails: {
				logAsMovingThumbnail: boolean
				thumbnails: {
					height: number
					url: string
					width: number
				}[]
			}
		}
	}
	shortBylineText: {
		runs: {
			navigationEndpoint: {
				browseEndpoint: {
					browseId: string
					canonicalBaseUrl: string
				}
				clickTrackingParams: string
				commandMetadata: {
					webCommandMetadata: {
						rootVe: number
						url: string
						webPageType: string
					}
				}
			}
			text: string
		}[]
	}
	shortViewCountText: {
		runs: {
			text: string
		}[]
		simpleText: string
	}
	showActionMenu: boolean
	thumbnail: {
		thumbnails: {
			height: number
			url: string
			width: number
		}[]
		webThumbnailDetailsExtensionData: {
			isPreloaded: boolean
		}
	}
	thumbnailOverlays: {
		thumbnailOverlayNowPlayingRenderer: {
			text: {
				runs: {
					text: string
				}[]
			}
		}
		thumbnailOverlayPlaybackStatusRenderer: {
			texts: {
				runs: {
					text: string
				}[]
			}[]
		}
		thumbnailOverlayResumePlaybackRenderer: {
			percentDurationWatched: number
		}
		thumbnailOverlayTimeStatusRenderer: {
			style: string
			text: {
				accessibility: {
					accessibilityData: {
						label: string
					}
				}
				simpleText: string
			}
		}
		thumbnailOverlayToggleButtonRenderer: {
			isToggled: boolean
			toggledAccessibility: {
				accessibilityData: {
					label: string
				}
			}
			toggledIcon: {
				iconType: string
			}
			toggledServiceEndpoint: {
				clickTrackingParams: string
				commandMetadata: {
					webCommandMetadata: {
						apiUrl: string
						sendPost: boolean
						url: string
					}
				}
				playlistEditEndpoint: {
					actions: {
						action: string
						removedVideoId: string
					}[]
					playlistId: string
				}
			}
			toggledTooltip: string
			trackingParams: string
			untoggledAccessibility: {
				accessibilityData: {
					label: string
				}
			}
			untoggledIcon: {
				iconType: string
			}
			untoggledServiceEndpoint: {
				clickTrackingParams: string
				commandMetadata: {
					webCommandMetadata: {
						apiUrl: string
						sendPost: boolean
						url: string
					}
				}
				playlistEditEndpoint: {
					actions: {
						action: string
						addedVideoId: string
					}[]
					playlistId: string
				}
				signalServiceEndpoint: {
					actions: {
						addToPlaylistCommand: {
							listType: string
							onCreateListCommand: {
								clickTrackingParams: string
								commandMetadata: {
									webCommandMetadata: {
										apiUrl: string
										sendPost: boolean
										url: string
									}
								}
								createPlaylistServiceEndpoint: {
									hack: boolean
									params: string
									videoIds: string[]
								}
							}
							openListPanel: boolean
							openMiniplayer: boolean
							videoId: string
							videoIds: string[]
						}
					}[]
				}
			}
			untoggledTooltip: string
		}
	}[]
	title: {
		accessibility: {
			accessibilityData: {
				label: string
			}
		}
		runs: {
			text: string
		}[]
		simpleText: string
	}
	trackingParams: string
	upcomingEventData: {
		isReminderSet: boolean
		startTime: string
		upcomingEventText: {
			runs: {
				text: string
			}[]
		}
	}
	videoId: string
	viewCountText: {
		runs: {
			text: string
		}[]
		simpleText: string
	}
}
