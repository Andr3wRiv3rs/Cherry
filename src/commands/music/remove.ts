import {
  Command, 
  MessageProps, 
} from '../../@interfaces'

const remove: Command = {
  regex: /^(remove|r)\s[0-9]+(\s|$)/i,

  usage: 'remove | r <position>',
  description: 'Removes a track at the specified position from queue.',

  async callback (props: MessageProps) {
    const [position] = props.args

    const { tracks } = props.queue

    if (tracks[Number(position) - 1]) {
      const [{
        title, url, duration, author, 
      }] = tracks.splice(Number(position) - 1, 1)

      await props.quickEmbed(
        `Removed track from queue`, 
        `[${title}](${url}) - ${duration}\n Requested by <@${author.id}>`,
      )
    } else {
      await props.quickEmbed(null, `Invalid position`)
    }
  },
}

export default remove
