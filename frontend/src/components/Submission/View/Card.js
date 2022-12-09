import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Icon from '../../Icon'
import FormSectionLabel from '../../common/labels/FormSectionLabel'
import { useTranslation } from 'react-i18next'
import ButtonBase from '@material-ui/core/ButtonBase'
import { formatRelative, isValid, parseISO } from 'date-fns'
import { uk } from 'date-fns/locale'
import { ViewType } from '../../../constants'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  card: props => ({
    display: props.viewType === ViewType.TILE ? 'block' : 'flex',
    width: props.viewType === ViewType.TILE ? 285 : '100%',
    height: props.viewType === ViewType.TILE ? 403 : 226,
    maxHeight: props.viewType === ViewType.TILE ? 403 : 226,
    borderRadius: 10,
    boxShadow: '0px 0px 15px rgba(45, 172, 253, .25)',
    '&:hover': {
      boxShadow: '0px 0px 15px rgba(45, 172, 253, .45)'
    },
    overflow: 'hidden'
  }),
  background: props => ({
    position: 'relative',
    borderRadius: props.viewType === ViewType.TILE ? 0 : 8,
    margin: props.viewType === ViewType.ROW ? `${theme.spacing(1.5)}px 0px ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px` : 0,
    height: props.viewType === ViewType.TILE ? 180 : 202,
    width: 285,
    minWidth: 285,
    background: 'url(/cardBg.png) no-repeat',
    backgroundSize: '100% 100%'
  }),
  divider: {
    backgroundColor: '#CDCDCD'
  },
  avatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 130,
    height: 130,
    margin: 'auto',
    background: '#C4C4C4'
  },
  date: {
    alignSelf: 'flex-end',
    marginBottom: 7,
    marginLeft: 21,
    color: 'white',
    fontSize: '.875rem',
    '&::first-letter': {
      textTransform: 'uppercase'
    }
  },
  vip: {
    display: 'block',
    alignSelf: 'flex-end',
    width: 60,
    justifySelf: 'flex-end'
  },
  like: {
    width: 20
  },
  rangeSpan: {
    color: '#BDBDBD',
    textTransform: 'lowercase'
  },
  unit: {
    fontSize: '.8rem'
  },
  plus: {
    padding: `0px ${theme.spacing(1)}px`,
    color: theme.palette.text.lightGray
  },
  cardAction: {
    display: 'block',
    width: 18
  }
}))

const Card = ({ handleSendFavorite, children, background, avatar, viewType, user, price, createdAt, replies, views, saved, id, isLiked = false }) => {
  const classes = useStyles({
    background,
    viewType
  })

  const theme = useTheme()
  const { t } = useTranslation()

  const handleLike = async (submissionId) => {
    await handleSendFavorite(submissionId)
  }

  return (
    <Box className={classes.card}>
      <Box className={classes.background} display={'flex'} flexWrap={'wrap'}>
        <Avatar className={classes.avatar} src={avatar}/>
        <Box display={'flex'} alignSelf={'flex-end'} justifyContent={'space-between'}
          flexGrow={viewType === ViewType.TILE ? 1 : 0}>
          {viewType === ViewType.TILE && <Typography className={classes.date}
            component={'span'}>{isValid(parseISO(createdAt)) && formatRelative(new Date(createdAt), new Date(), { locale: uk })}</Typography>}
          {user && user.isVip ? <span className={classes.vip}>
            <Icon type={'vip'}/>
          </span> : null}
        </Box>
      </Box>
      <Box px={2.5} flexGrow={1} overflow='hidden'>
        <Box>
          {children}
          <Box py={0.5} mt={viewType === ViewType.TILE ? 0 : 1} display={'flex'} justifyContent={'space-between'}
            alignItems={'center'}>
            {viewType === ViewType.ROW && <Box display={'flex'} justifyContent={'space-between'} flexBasis='80%'>
              {isValid(parseISO(createdAt)) &&
              <Typography variant={'subtitle1'} component={'span'} color={'textSecondary'}>
                {`${t('published')}: `}
                <span
                  className={classes.capitalize}> {formatRelative(new Date(createdAt), new Date(), { locale: uk })} </span>
              </Typography>}

              {typeof views !== 'undefined' && views !== null &&
              <>
                <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                <Typography variant={'subtitle1'} component={'span'} color={'textSecondary'}>
                  {`${t('views')}: `} {views}</Typography>
              </>}
              {typeof saved !== 'undefined' && saved !== null &&
              <>
                <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                <FormSectionLabel fontSize={theme.typography.subtitle1.fontSize} text={saved} iconSize={18}
                  icon={'favorite'} color={theme.palette.text.secondary}/>
              </>
              }
              {typeof replies !== 'undefined' && replies !== null &&
              <>
                <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                <FormSectionLabel fontSize={theme.typography.subtitle1.fontSize} iconSize={20} text={replies}
                  icon={'comment'} color={theme.palette.text.secondary}/>
              </>
              }
            </Box>}
            {viewType === ViewType.ROW &&
            !isNaN(price) &&
            <FormSectionLabel textTransform='none' text={`${price} ${t('currency.uah')}`} icon={'money'}
              fontSize={theme.typography.body1.fontSize}
              fontWeight={theme.typography.fontWeightBold}
              color={theme.palette.primary.main}/>
            }
          </Box>
        </Box>
        {viewType === ViewType.TILE && <Box display='flex' justifyContent='space-between'>
          {!isNaN(price) && <FormSectionLabel textTransform='none' text={`${price} ${t('currency.uah')}`} icon={'money'}
            fontSize={theme.typography.body1.fontSize}
            fontWeight={theme.typography.fontWeightBold}
            color={theme.palette.primary.main}/>
          }
          {viewType === ViewType.TILE && <ButtonBase className={classes.like} onClick={() => handleLike(id)}>
            {isLiked ? <Icon type={'favoriteFilled'} size={19}/> : <Icon type={'favorite'} size={19}/>}
          </ButtonBase>}
        </Box>}
      </Box>
    </Box>)
}

export default Card
